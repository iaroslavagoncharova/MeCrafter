import express from 'express';
import {
  createLike,
  getCount,
  getLikeByPostAndUser,
  getLikeByPostId,
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
    body('post_id').notEmpty().isInt(),
    validationErrors,
    createLike,
  );

likesRouter.route('/bypost/:id').get(getLikeByPostId);

likesRouter.route('/bypost/user/:id').get(authenticate, getLikeByPostAndUser);

likesRouter.route('/byuser/:id').get(authenticate, getLikeByUserId);

likesRouter.route('/:id').delete(authenticate, removeLike);

likesRouter.route('/count/:id').get(getCount);

export default likesRouter;
