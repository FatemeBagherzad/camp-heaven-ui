import factory from './handlerFactory.js';
import Gear from './../models/gearModel.js';

export const getAllgears = factory.getAll(Gear);
export const getGear = factory.getOne(Gear, { path: 'users' });
export const updateGear = factory.updateOne(Gear);
