import express from 'express';
import { getAllUsers } from '../controllers/userController';


const userRoute = express.Router();

userRoute.get('/', getAllUsers);

export default userRoute;
