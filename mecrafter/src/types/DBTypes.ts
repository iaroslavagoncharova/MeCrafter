type UserHabits = {
    habit_id: number;
    habit_name: string;
    habit_description: string;
    habit_category: string;
}
type User = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    habit_id: number;
    habit_frequency: number;
    created_at: string;
    habit_name: string;
}
type UnauthorizedUser = Omit<User, 'password'>
type PutUserValues = {
    username?: string | null;
    password?: string | null;
    email?: string | null;
  };

type MediaItem = {
    media_id: number;
    user_id: number;
    username: string;
    filename: string;
    thumbnail: string;
    filesize: number;
    media_type: string;
    title: string;
    description: string | null;
    created_at: Date | string;
}
type MediaItemWithOwner = MediaItem & Pick<User, 'username'>

export type { UserHabits, User, MediaItem, MediaItemWithOwner, UnauthorizedUser, PutUserValues }