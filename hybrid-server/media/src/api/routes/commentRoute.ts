import express from 'express';
import {
  getAllComments,
  getCommentsCountForPost,
  getCommentsForPost,
  getCommentsOfUser,
} from '../controllers/commentController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const commentRouter = express.Router();

commentRouter.route('/').get(getAllComments);

commentRouter.route('/bypost/:id').get(getCommentsForPost);

commentRouter.route('/byuser/:id').get(getCommentsOfUser);

commentRouter.route('/count/:id').get(getCommentsCountForPost);

export default commentRouter;
