import multer from 'multer';
import sharp from 'sharp';
import initKnex from 'knex';
import configuration from '../knexfile.js';
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

const uploadCampImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

const resizeCampImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  req.body.imageCover = `camp-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/camps/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `camp-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/camps/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

const aliasTopCamps = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

const getCampStats = catchAsync(async (req, res, next) => {
  const stats = await knex('camps')
    .select(
      'difficulty',
      knex.raw('COUNT(*) as numCamps'),
      knex.raw('SUM(ratingsQuantity) as numRatings'),
      knex.raw('AVG(ratingsAverage) as avgRating'),
      knex.raw('AVG(price) as avgPrice'),
      knex.raw('MIN(price) as minPrice'),
      knex.raw('MAX(price) as maxPrice')
    )
    .where('ratingsAverage', '>=', 4.5)
    .groupBy('difficulty')
    .orderBy('avgPrice', 'asc');

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

const getAllCamps = factory.getAll('camps');
const getCamp = factory.getOne('camps');
const createCamp = factory.createOne('camps');
const updateCamp = factory.updateOne('camps');
const deleteCamp = factory.deleteOne('camps');

export {
  uploadCampImages,
  resizeCampImages,
  aliasTopCamps,
  getAllCamps,
  getCamp,
  createCamp,
  updateCamp,
  deleteCamp,
  getCampStats,
};
