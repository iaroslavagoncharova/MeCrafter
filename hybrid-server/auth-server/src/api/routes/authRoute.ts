import express from 'express';
import {body} from 'express-validator';
import { login } from '../controllers/authController';


const authRoute = express.Router();

authRoute.post('/login', body('username').isString().notEmpty().isLength({min: 3, max: 20}),
body('password').isLength({min: 8, max: 20}).isString().notEmpty(),
 login);

export default authRoute;
