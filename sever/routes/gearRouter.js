import express from 'express';
import * as gearController from './../controllers/gearController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(gearController.getAllGears);

router
  .route('/:id')
  .get(gearController.getGear)
  .patch(gearController.updateGear);

export default router;
