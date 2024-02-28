import {Request, Response, NextFunction} from 'express';
import {
  getComments,
  getCommentsByPostId,
  getCommentsByUserId,
  getCommentsCountByPostId,
} from '../models/commentModel';
import {Comment, TokenUser} from '@sharedTypes/DBTypes';
import CustomError from '../../classes/CustomError';
const getAllComments = async (
  req: Request,
  res: Response<Comment[]>,
  next: NextFunction
) => {
  try {
    const comments = await getComments();
    if (comments) {
      res.json(comments);
      return;
    }
    next(new CustomError('No comments found', 404));
  } catch (error) {
    next(error);
  }
};

const getCommentsForPost = async (
  req: Request<{id: string}>,
  res: Response<Comment[]>,
  next: NextFunction
) => {
  try {
    const commentResult = await getCommentsByPostId(Number(req.params.id));
    if (commentResult) {
      res.json(commentResult);
      return;
    }
    next(new CustomError('No comments found', 404));
  } catch (error) {
    next(error);
  }
};

const getCommentsCountForPost = async (
  req: Request<{id: string}>,
  res: Response<{count: number}>,
  next: NextFunction
) => {
  try {
    const countResult = await getCommentsCountByPostId(Number(req.params.id));
    if (countResult) {
      res.json({count: countResult});
      return;
    }
    next(new CustomError('No comments found', 404));
  } catch (error) {
    next(error);
  }
};

const getCommentsOfUser = async (
  req: Request,
  res: Response<Comment[], {user: TokenUser}>,
  next: NextFunction
) => {
  try {
    const comments = await getCommentsByUserId(Number(res.locals.user.user_id));
    if (comments) {
      res.json(comments);
      return;
    }
    next(new CustomError('No comments found', 404));
  } catch (error) {
    next(error);
  }
};

export {
  getAllComments,
  getCommentsForPost,
  getCommentsCountForPost,
  getCommentsOfUser,
};
