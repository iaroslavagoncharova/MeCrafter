import express from 'express';
import {
  checkEmail,
  checkToken,
  checkUsername,
  deleteUser,
  getAllUsers,
  getUser,
  postUser,
  putUser,
} from '../controllers/userController';
import {body, param} from 'express-validator';
import {createUser, updateUser} from '../models/userModel';
import {authenticate} from '../../middlewares';

const userRoute = express.Router();

userRoute.get('/', getAllUsers);
userRoute.get(
  '/username/:username',
  param('username').isString().escape(),
  checkUsername
);
userRoute.get('/email/:email', param('email').isEmail().normalizeEmail(), checkEmail);
userRoute.get('/token', authenticate, checkToken);
userRoute.route('/:id').get(param('id').isNumeric(), getUser);
userRoute.post(
  '/',
  body('username')
    .notEmpty()
    .isString()
    .escape()
    .trim()
    .isLength({min: 3, max: 20}),
  body('email').isEmail().normalizeEmail().isString(),
  body('password')
    .isString()
    .notEmpty()
    .isLength({min: 8, max: 20})
    .isString()
    .escape()
    .trim(),
  postUser
);
userRoute.put(
  '/',
  authenticate,
  body('email').optional().isEmail(),
  body('username').optional().isString().escape().trim().isLength({ min: 3, max: 20 }),
  body('password').optional().isString().escape().trim().isLength({ min: 8, max: 20 }),
  putUser
);
userRoute.delete('/', authenticate, deleteUser);
export default userRoute;
