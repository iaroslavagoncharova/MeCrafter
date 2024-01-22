import { RowDataPacket } from 'mysql2';
import {promisePool} from '../../lib/db';

const getUsers = async () => {
  try {
    const [result] = await promisePool.execute<RowDataPacket[]>('SELECT * FROM users');
    if (result.length === 0) {
      return null;
    }
    return result;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export { getUsers };
