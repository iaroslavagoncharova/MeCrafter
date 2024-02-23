import express from 'express';
import {
  getAllHabits,
  getHabit,
  getCreatedHabit,
  getAllCreatedHabits,
  postHabit,
  postFrequency,
  putHabit,
} from '../controllers/habitController';
import { authenticate } from '../../middlewares';

const habitRoute = express.Router();

habitRoute.get('/', getAllHabits);
habitRoute.get('/created', getAllCreatedHabits);
habitRoute.get('/created/:id', getCreatedHabit);
habitRoute.put('/habit', authenticate, putHabit);
habitRoute.post('/', authenticate, postHabit);
habitRoute.post('/frequency', authenticate, postFrequency);
habitRoute.get('/:id', getHabit);

export default habitRoute;
