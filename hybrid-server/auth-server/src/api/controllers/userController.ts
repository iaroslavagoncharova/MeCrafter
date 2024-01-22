import { NextFunction, Request, Response } from "express";
import {getUsers} from '../models/userModel'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers();
    if (users === null) {
      next(new Error('Users not found'));
      return;
    }
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

export { getAllUsers };
