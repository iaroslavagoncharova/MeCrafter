import express from 'express';
import {
  deleteComment,
  getAllComments,
  getCommentsCountForPost,
  getCommentsForPost,
  getCommentsOfUser,
  postComment,
  updateComment,
} from '../controllers/commentController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const commentRouter = express.Router();

commentRouter
  .route('/')
  .get(getAllComments)
  .post(
    authenticate,
    body('comment_text').isString().isLength({min: 1, max: 255}),
    body('post_id').isInt({min: 1}),
    validationErrors,
    postComment,
  );

commentRouter
  .route('/:id')
  .delete(authenticate, deleteComment)
  .put(authenticate, updateComment);

commentRouter.route('/bypost/:id').get(getCommentsForPost);

commentRouter.route('/byuser/:id').get(getCommentsOfUser);

commentRouter.route('/count/:id').get(getCommentsCountForPost);

export default commentRouter;
