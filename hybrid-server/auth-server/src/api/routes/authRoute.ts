import express from 'express';
import {body} from 'express-validator';
import {loginUser} from '../controllers/authController';

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({min: 5}), loginUser);

export default router;
