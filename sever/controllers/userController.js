import initKnex from 'knex';
import configuration from '../knexfile.js';
import multer from 'multer';
import sharp from 'sharp';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import * as factory from './handlerFactory.js';

const knex = initKnex(configuration);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id; // assuming req.user.id is set during authentication
  next();
};

// Update the user's information
const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filter out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user in the database using Knex
  const [updatedUser] = await knex('users')
    .where({ id: req.user.id })
    .update(filteredBody)
    .returning('*');

  if (!updatedUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Deactivate user
const deleteMe = catchAsync(async (req, res, next) => {
  await knex('users').where({ id: req.user.id }).update({ active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Create user (for signup)
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

// Get user by ID
const getUser = factory.getOne(knex, 'users'); // You may need to adjust factory methods
const getAllUsers = factory.getAll(knex, 'users');

// Do NOT update passwords with this!
const updateUser = factory.updateOne(knex, 'users'); // Adjust factory methods as needed
const deleteUser = factory.deleteOne(knex, 'users'); // Adjust factory methods as needed

export {
  uploadUserPhoto,
  resizeUserPhoto,
  getMe,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
