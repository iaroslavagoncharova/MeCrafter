import express from 'express';
import {
  createPost,
  getPost,
  getPostsList,
  removePost,
  updatePost,
} from '../controllers/postsController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';
const postsRouter = express.Router();

postsRouter
  .route('/')
  .get(getPostsList)
  .post(
    authenticate,
    body('post_title').notEmpty().isString().escape(),
    body('post_text').notEmpty().isString().escape(),
    body('filename').notEmpty().isString().escape(),
    body('media_type').notEmpty().isString().escape(),
    body('filesize').notEmpty().isNumeric().escape(),
    validationErrors,
    createPost
  );

postsRouter
  .route('/:id')
  .get(getPost)
  .put(
    authenticate,
    body('post_title').optional().isString().escape(),
    body('post_text').optional().isString().escape(),
    validationErrors,
    updatePost
  )
  .delete(authenticate, removePost);

export default postsRouter;
