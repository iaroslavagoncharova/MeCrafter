import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {TokenContent} from '@sharedTypes/DBTypes'

const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (!user) {
      next(new Error('User not found'));
      return;
    }

    const tokenContent: TokenContent = {
      user_id: user.id,
      email: user.email,
    };

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET as string);

    const message: LoginResponse = {
      message: 'Login successful',
      token,
    };

    res.status(200).json(message);
    } catch (error) {
      next(new Error(error as Error).message, 500);
    }
};

export default loginUser;
