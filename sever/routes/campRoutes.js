import express from 'express';
import * as campController from './../controllers/campController.js';
import * as authController from './../controllers/authController.js';
import reviewRouter from './../routes/reviewRoutes.js';

const router = express.Router();

router.use('/:campId/reviews', reviewRouter);

router
  .route('/top-5-rate')
  .get(campController.aliasTopCamps, campController.getAllCamps);

router.route('/camp-stats').get(campController.getCampStats);

router
  .route('/')
  .get(campController.getAllCamps)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    campController.createCamp
  );

router
  .route('/:id')
  .get(campController.getCamp)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    campController.uploadCampImages,
    campController.resizeCampImages,
    campController.updateCamp
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    campController.deleteCamp
  );

export default router;
