import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Comment, Post} from '@sharedTypes/DBTypes';
import promisePool from '../../lib/db';
import {MessageResponse} from '@sharedTypes/MessageTypes';

const getComments = async (): Promise<Comment[] | null> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[] & Comment[]>(
      'SELECT * FROM comments'
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
      'SELECT * FROM comments WHERE post_id = ?',
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
      'SELECT COUNT(*) as commentCount FROM comments WHERE post_id = ?',
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
      'SELECT * FROM comments WHERE user_id = ?',
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

const createComment = async (
  comment: Omit<Comment, 'comment_id' | 'created_at'>
): Promise<Comment | null> => {
  console.log('comment', comment);
  const sql =
    'INSERT INTO comments (post_id, user_id, comment_text) VALUES (?, ?, ?)';
  const params = [comment.post_id, comment.user_id, comment.comment_text];
  try {
    const result = await promisePool.query<ResultSetHeader>(sql, params);
    const [rows] = await promisePool.query<RowDataPacket[] & Comment[]>(
      'SELECT * FROM comments WHERE comment_id = ?',
      [result[0].insertId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('createComment error', (error as Error).message);
    throw new Error((error as Error).message);
  }
};

const deleteCommentById = async (
  comment_id: number,
  user_id: number,
  token: string
): Promise<MessageResponse | null> => {
  try {
    const [rows] = await promisePool.query<ResultSetHeader>(
      'DELETE FROM comments WHERE comment_id = ? AND user_id = ?',
      [comment_id, user_id]
    );
    if (rows.affectedRows === 0) {
      return null;
    }
    return {message: 'Comment deleted'};
  } catch (error) {
    console.error('deleteCommentById error', (error as Error).message);
    throw new Error((error as Error).message);
  }
};

export {
  getComments,
  getCommentsByPostId,
  getCommentsCountByPostId,
  getCommentsByUserId,
  createComment,
  deleteCommentById,
};
