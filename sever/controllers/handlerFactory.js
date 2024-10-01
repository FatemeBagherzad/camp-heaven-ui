import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from './../utils/apiFeatures.js';
import User from './../models/userModel.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const { userId, gearId, gearName } = req.body;
    const user = await User.findById(userId);
    user.userGears.push({ name: gearName, _id: gearId });

    await User.findByIdAndUpdate(
      userId,
      { userGears: user.userGears },
      { new: true, runValidators: true }
    );

    console.log('🟨🟨🟨', user);

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    console.log('from get one in factory 👉👉👉👉👉👉👉👉👉', query);

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.campId) filter = { camp: req.params.campId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort();

    const doc = await features.query;

    doc.forEach((obj) => {
      if (obj.imageCover) {
        let a = obj.imageCover;
        let b = obj.images[0];
        let c = obj.images[1];
        let d = obj.images[2];

        obj.imageCover = `${process.env.HOST_URL}/img/camps/${a}`;
        obj.images[0] = `${process.env.HOST_URL}/img/camps/${b}`;
        obj.images[1] = `${process.env.HOST_URL}/img/camps/${c}`;
        obj.images[2] = `${process.env.HOST_URL}/img/camps/${d}`;
      }
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
