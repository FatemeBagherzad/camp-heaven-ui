import express from 'express';
import gearController from './../controllers/gearController.js';

const router = express.Router();

router.route('/').get(gearController.getAllgears);

router
  .route('/:id')
  .get(gearController.getGear)
  .patch(gearController.updateGear);

export default router;
