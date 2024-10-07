import initKnex from 'knex';
import configuration from '../knexfile.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from './../utils/apiFeatures.js';
import dotenv from 'dotenv';
import path from 'path';
import uniqid from 'uniqid';

dotenv.config();
const knex = initKnex(configuration);

const getOne = (table) =>
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

const createOne = (table) =>
  catchAsync(async (req, res, next) => {
    if (table === 'camps') {
      const {
        name,
        lat,
        lng,
        address,
        summary,
        description,
        imageCover,
        images,
      } = req.body;
      if (
        !name ||
        !lat ||
        !lng ||
        !address ||
        !summary ||
        !description ||
        !imageCover ||
        !images
      ) {
        return next(new AppError('Please provide all required fields.', 400));
      }
      let newId = uniqid();
      await knex(table).insert({
        id: newId,
        name,
        lat,
        lng,
        address,
        ratingsAverage: 0,
        ratingsQuantity: 0,
        maxGroupSize: 0,
        price: ' ...$',
        difficulty: 'medium',
        summary,
        description,
        imageCover,
        images: JSON.stringify(images),
      });
      const newCamp = await knex(table).where({ id: newId }).first();
      res.status(201).json({
        status: 'success',
        data: {
          data: newCamp,
        },
      });
    }

    if (table === 'gears') {
      const { name, category } = req.body;
      if (!name || !category) {
        return next(
          new AppError(
            'Please provide all required fields (name, category).',
            400
          )
        );
      }
      const newGear = {
        id: uniqid(),
        name,
        have: 'no',
        category,
        usersid: [],
      };
      await knex('gears').insert(newGear);
      const createdGear = await knex('gears').where({ id: newGear.id }).first();
      res.status(201).json({
        status: 'success',
        data: {
          gear: createdGear,
        },
      });
    }

    if (table === 'reviews') {
      const existingReview = await knex('reviews')
        .where({ user_id: req.body.user_id, camp_id: req.body.camp_id })
        .first();

      if (existingReview) {
        return next(
          new AppError('You have already written a review for this camp', 400)
        );
      }

      const newReview = { id: uniqid(), ...req.body };
      await knex('reviews').insert(newReview);

      res.status(201).json({
        status: 'success',
        data: {
          data: newReview,
        },
      });
    }

    return next(new AppError('Invalid table name provided.', 400));
  });

const deleteOne = (table) =>
  catchAsync(async (req, res, next) => {
    const document = await knex(table).where({ id: req.params.id }).first();

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    await knex(table).where({ id: req.params.id }).del();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

const updateOne = (table) =>
  catchAsync(async (req, res, next) => {
    const doc = await knex(table).where({ id: req.params.id }).first();

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    await knex(table).where({ id: req.params.id }).update(req.body);

    const updatedDoc = await knex(table).where({ id: req.params.id }).first();

    if (table === 'gears') {
      const { userId, gearId, gearName } = req.body;
      if (userId) {
        const user = await knex('users').where({ id: userId }).first();

        if (user) {
          let userGears = user.userGears ? JSON.parse(user.userGears) : [];
          userGears.push({ name: gearName, id: gearId });

          await knex('users')
            .where({ id: userId })
            .update({ userGears: JSON.stringify(userGears) });
        }
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedDoc,
      },
    });
  });

//old function for when databse was Mongo DB
// const getAll = (table) =>
//   catchAsync(async (req, res, next) => {
//     let filter = {};
//     if (req.params.campId) filter = { camp: req.params.campId };

//     const features = new APIFeatures(knex(table).where(filter), req.query)
//       .filter()
//       .sort();

//     const doc = await features.query;

//     doc.forEach((obj) => {
//       if (obj.imageCover) {
//         const a = obj.imageCover;
//         const b = obj.images[0];
//         const c = obj.images[1];
//         const d = obj.images[2];

//         obj.imageCover = `${process.env.HOST_URL}/img/camps/${a}`;
//         obj.images[0] = `${process.env.HOST_URL}/img/camps/${b}`;
//         obj.images[1] = `${process.env.HOST_URL}/img/camps/${c}`;
//         obj.images[2] = `${process.env.HOST_URL}/img/camps/${d}`;
//       }
//     });

//     // SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       results: doc.length,
//       data: {
//         data: doc,
//       },
//     });
//   });

const getAll = (table) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.campId) {
      filter = { camp_id: req.params.campId };
    }

    const features = new APIFeatures(knex(table).where(filter), req.query)
      .filter()
      .sort();
    const doc = await features.query;

    if (table === 'camps') {
      doc.forEach((obj) => {
        if (obj.imageCover) {
          obj.imageCover = `${process.env.HOST_URL}/img/camps/${obj.imageCover}`;
        }

        if (obj.images) {
          // Parse images from JSON string (if stored as JSON)
          const images =
            typeof obj.images === 'string'
              ? JSON.parse(obj.images)
              : obj.images;
          obj.images = images.map(
            (image) => `${process.env.HOST_URL}/img/camps/${image}`
          );
        }
      });
    }

    if (table === 'gears') {
      const { userId } = req.params;

      const userGears = await knex('gears').whereRaw(
        'JSON_CONTAINS(usersid, ?)',
        JSON.stringify(userId)
      );

      const notUserGears = await knex('gears').whereNotIn(
        'id',
        knex('gears')
          .select('id')
          .whereRaw('JSON_CONTAINS(usersid, ?)', JSON.stringify(userId))
      );

      return res.status(200).json({
        status: 'success',
        data: {
          have: userGears,
          notHave: notUserGears,
        },
      });
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

export { deleteOne, updateOne, createOne, getOne, getAll };
