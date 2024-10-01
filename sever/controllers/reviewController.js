import initKnex from 'knex';
import configuration from '../knexfile.js';
import * as factory from './handlerFactory.js';

const knex = initKnex(configuration);

// Set user and camp IDs for nested routes
const setCampUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.camp) req.body.camp = req.params.campId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

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
};
