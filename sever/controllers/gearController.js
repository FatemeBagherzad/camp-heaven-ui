import initKnex from 'knex';
import configuration from '../knexfile.js';
import * as factory from './handlerFactory.js';

const knex = initKnex(configuration);

// Instead of using Gear model, we will use strings for table names.
const getAllGears = factory.getAll('gears');
const getGear = factory.getOne('gears', { path: 'users' });
const updateGear = factory.updateOne('gears');

export { getAllGears, getGear, updateGear };
