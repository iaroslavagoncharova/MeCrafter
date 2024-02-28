import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Comment} from '@sharedTypes/DBTypes';
import promisePool from '../../lib/db';

const getComments = async (): Promise<Comment[] | null> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[] & Comment[]>(
      `SELECT * FROM comments`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    console.error('getComments error', (error as Error).message);
    throw new Error((error as Error).message);
  }
};

const getCommentsByPostId = async (id: number): Promise<Comment[] | null> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[] & Comment[]>(
      `SELECT * FROM comments WHERE post_id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    console.error('getCommentsByPostId error', (error as Error).message);
    throw new Error((error as Error).message);
  }
};

const getCommentsCountByPostId = async (id: number): Promise<number | null> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
      `SELECT COUNT(*) as commentCount FROM comments WHERE post_id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0].commentCount;
  } catch (error) {
    console.error('getCommentsCountForPost error', (error as Error).message);
    throw new Error((error as Error).message);
  }
};

const getCommentsByUserId = async (id: number): Promise<Comment[] | null> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[] & Comment[]>(
      `SELECT * FROM comments WHERE user_id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    console.error('getCommentsByUserId error', (error as Error).message);
    throw new Error((error as Error).message);
  }
};

export {
  getComments,
  getCommentsByPostId,
  getCommentsCountByPostId,
  getCommentsByUserId,
};
