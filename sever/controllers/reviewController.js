import Review from './../models/reviewModel.js';
import factory from './handlerFactory.js';
// import catchAsync from './../utils/catchAsync.js';

export const setCampUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.camp) req.body.camp = req.params.campId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = factory.getAll(Review);
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const updateReview = factory.updateOne(Review);
export const deleteReview = factory.deleteOne(Review);
