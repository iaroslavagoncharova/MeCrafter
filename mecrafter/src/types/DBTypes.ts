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
}
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

export type { UserHabits, User, MediaItem, MediaItemWithOwner}