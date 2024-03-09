import express from 'express';
import {
  createLike,
  getCount,
  getLikeByUserId,
  getLikes,
  removeLike,
} from '../controllers/likesController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const likesRouter = express.Router();

likesRouter
  .route('/')
  .get(getLikes)
  .post(
    authenticate,
    body('post_id').isInt({min: 1}),
    validationErrors,
    createLike
  );

likesRouter.route('/:id').delete(authenticate, removeLike);
likesRouter.route('/bypost/:id').get(authenticate, getLikeByUserId);

likesRouter.route('/count/:id').get(getCount);

export default likesRouter;
