import initKnex from 'knex';
import configuration from '../knexfile.js';
import catchAsync from './../utils/catchAsync.js';
import * as factory from './handlerFactory.js';

const knex = initKnex(configuration);

// Set user and camp IDs for nested routes
const setCampUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.camp) req.body.camp = req.params.campId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Check review ownership for updates and deletes
const checkReviewOwnership = catchAsync(async (req, res, next) => {
  const review = await knex('reviews').where({ id: req.params.id }).first();
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  // Check if the logged-in user is the author of the review or has admin rights
  if (review.user !== req.user.id && req.user.role !== 'admin') {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }

  next();
});

// Using string for table name instead of the Review model
const getAllReviews = factory.getAll('reviews');
const getReview = factory.getOne('reviews');
const createReview = factory.createOne('reviews');
const updateReview = factory.updateOne('reviews');
const deleteReview = factory.deleteOne('reviews');

export {
  setCampUserIds,
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  checkReviewOwnership,
};
