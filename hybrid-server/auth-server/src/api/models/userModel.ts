import {promisePool} from '../../lib/db';

const getUserByEmail = async (email: string): Promise<UserWithLevel | null> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[]>(
      `
    SELECT
      Users.user_id,
      Users.username,
      Users.password,
      Users.email,
    FROM Users
    WHERE Users.email = ?
  `,
      [email]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('getUserByEmail error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export { getUserByEmail };
