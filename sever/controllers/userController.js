import initKnex from 'knex';
import configuration from '../knexfile.js';
import multer from 'multer';
import sharp from 'sharp';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import * as factory from './handlerFactory.js';

const knex = initKnex(configuration);

//Buffer because we have to proccess file before saving it
const multerStorage = multer.memoryStorage();

//Filter the types of files being uploaded.
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

//Configures the multer middleware for handling file uploads with the defined storage and fileFilter options.
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//Sets up a middleware to handle single image uploads for a field named 'photo'

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  console.log('😨😨😨resize', req.file);
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

//Selectively update or use only certain fields from an object,
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
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name');
  if (req.file) filteredBody.photo = req.file.filename;
  const result = await knex('users')
    .where({ id: req.user.id })
    .update(filteredBody);
  const updatedUser = await knex('users').where({ id: req.user.id }).first();
  if (!updatedUser) {
    return next(new AppError('User not found', 404));
  }
  console.log('updatedUser🟨⏫🟨', updatedUser);
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
const getUser = factory.getOne('users');
const getAllUsers = factory.getAll('users');
const updateUser = factory.updateOne('users');
const deleteUser = factory.deleteOne('users');

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
