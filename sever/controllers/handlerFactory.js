import initKnex from 'knex';
import configuration from '../knexfile.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from './../utils/apiFeatures.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const knex = initKnex(configuration);

const deleteOne = (table) =>
  catchAsync(async (req, res, next) => {
    const [deletedDoc] = await knex(table)
      .where({ id: req.params.id })
      .del()
      .returning('*');

    if (!deletedDoc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

const updateOne = (table) =>
  catchAsync(async (req, res, next) => {
    const [updatedDoc] = await knex(table)
      .where({ id: req.params.id })
      .update(req.body)
      .returning('*');

    if (!updatedDoc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const { userId, gearId, gearName } = req.body;

    if (userId) {
      const user = await knex('users').where({ id: userId }).first();

      if (user) {
        user.userGears.push({ name: gearName, _id: gearId });
        await knex('users')
          .where({ id: userId })
          .update({ userGears: JSON.stringify(user.userGears) });
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedDoc,
      },
    });
  });

const createOne = (table) =>
  catchAsync(async (req, res, next) => {
    const [doc] = await knex(table).insert(req.body).returning('*');

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

const getOne = (table, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await knex(table).where({ id: req.params.id }).first();

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

const getAll = (table) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.campId) filter = { camp: req.params.campId };

    const features = new APIFeatures(knex(table).where(filter), req.query)
      .filter()
      .sort();

    const doc = await features.query;

    doc.forEach((obj) => {
      if (obj.imageCover) {
        const a = obj.imageCover;
        const b = obj.images[0];
        const c = obj.images[1];
        const d = obj.images[2];

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

export { deleteOne, updateOne, createOne, getOne, getAll };
