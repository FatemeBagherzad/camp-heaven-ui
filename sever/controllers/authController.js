import crypto from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import Email from './../utils/email.js';
import bcrypt from 'bcryptjs';
import uniqid from 'uniqid';
import dotenv from 'dotenv';

dotenv.config();
import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  const cookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN;
  if (!cookieExpiresIn) {
    throw new Error('Invalid JWT_COOKIE_EXPIRES_IN value. It must be defined.');
  }
  const daysMatch = cookieExpiresIn.match(/(\d+)d/);
  if (!daysMatch) {
    throw new Error(
      'Invalid JWT_COOKIE_EXPIRES_IN format. It must be in the form of "90d".'
    );
  }
  const days = Number(daysMatch[1]);
  const cookieOptions = {
    expires: new Date(
      Date.now() + days * 24 * 60 * 60 * 1000 // Convert to milliseconds
    ),
    httpOnly: true,
    sameSite: 'lax',
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  try {
    const existingUser = await knex('users').where({ email }).first();

    if (existingUser) {
      return next(new AppError('Email already exists', 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').insert({
      id: uniqid(),
      name,
      role: 'user',
      email,
      password: hashedPassword,
      photo: 'default.jpg',
    });
    const newUser = await knex('users').where({ email }).first();

    createSendToken(newUser, 201, req, res);
  } catch (error) {
    console.error(error);
    return next(new AppError('Error registering user', 500));
  }
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await knex('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    createSendToken(user, 200, req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.replace('Bearer ', '');
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await knex('users').where({ id: decoded.id }).first();
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
const isLoggedIn = async (req, res, next) => {
  if (req.cookies && req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await knex('users').where({ id: decoded.id }).first();
      if (!currentUser) {
        return next();
      }
      // 4) Check if user changed password after the token was issued
      // Assuming you have a `passwordChangedAt` field in your `users` table:
      const changedTimestamp =
        new Date(currentUser.passwordChangedAt).getTime() / 1000;
      if (decoded.iat < changedTimestamp) {
        return next();
      }

      // 5) There is a logged-in user, make the user data available in `res.locals`
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

//⛔⛔⛔I have to add necessary fields to database and also add route for it
const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await knex('users').where({ email: req.body.email }).first();
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // Generate the random reset token and update the user's reset fields
  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await knex('users')
    .where({ email: req.body.email })
    .update({
      password_reset_token: passwordResetToken,
      password_reset_expires: new Date(passwordResetExpires),
    });

  //Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    // In case of an error, clear the reset fields in the database
    await knex('users').where({ email: req.body.email }).update({
      password_reset_token: null,
      password_reset_expires: null,
    });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Find user with this hashed token and ensure the token has not expired
  const user = await knex('users')
    .where({
      password_reset_token: hashedToken,
    })
    .andWhere('password_reset_expires', '>', new Date()) // Check that the token has not expired
    .first();

  // If the token is invalid or has expired, return an error
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  //  Update user's password and remove reset fields
  await knex('users').where({ id: user.id }).update({
    password: req.body.password, // Ensure to hash this password before storing it in your real app
    password_confirm: req.body.passwordConfirm,
    password_reset_token: null,
    password_reset_expires: null,
    password_changed_at: new Date(), // Optional: Track when the password was last changed
  });

  //  Retrieve the updated user to pass to the `createSendToken` function
  const updatedUser = await knex('users').where({ id: user.id }).first();

  // Send the JWT token back to the client
  createSendToken(updatedUser, 200, req, res);
});

const updatePassword = catchAsync(async (req, res, next) => {
  const user = await knex('users')
    .where({ id: req.user.id })
    .select('password')
    .first();

  if (
    !user ||
    !(await bcrypt.compare(req.body.passwordCurrent, user.password))
  ) {
    return next(new AppError('Your current password is incorrect.', 401));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  await knex('users').where({ id: req.user.id }).update({
    password: hashedPassword,
    password_reset_token: null,
    password_reset_expires: null,
    password_changed_at: new Date(), // Optional: Track when the password was changed
  });

  const updatedUser = await knex('users').where({ id: req.user.id }).first();
  createSendToken(updatedUser, 200, req, res);
});

export {
  signToken,
  createSendToken,
  signup,
  login,
  logout,
  protect,
  isLoggedIn,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
};
