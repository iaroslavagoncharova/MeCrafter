type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  created_at: Date | string;
  habit_id: number;
  habit_frequency: string;
  habit_name?: string;
};

type UnauthorizedUser = Omit<User, "password">;

type TokenUser = Pick<User, "user_id">

type PutUserValues = {
  username?: string | null;
  email?: string | null;
  password?: string | null;
};

type UserHabits = {
  habit_id: number;
  habit_name: string;
  habit_description: string;
  habit_category: string;
}

// for media api

type Post = {
  post_id: number;
  user_id: number;
  post_text: string;
  post_title: string;
  created_at: string;
  filename: string;
  thumbnail: string;
  filesize: number;
  media_type: string;
};

type Comment = {
  comment_id: number;
  post_id: number;
  user_id: number;
  comment_text: string;
  created_at: Date;
};

type Like = {
  like_id: number;
  post_id: number;
  user_id: number;
  created_at: Date;
};

type Rating = {
  rating_id: number;
  media_id: number;
  user_id: number;
  rating_value: number;
  created_at: Date;
};

type Tag = {
  tag_id: number;
  tag_name: string;
};

type MediaItemTag = {
  media_id: number;
  tag_id: number;
};

type TagResult = MediaItemTag & Tag;

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};

// type MostLikedMedia = Pick<
//   MediaItem,
//   | "media_id"
//   | "filename"
//   | "filesize"
//   | "media_type"
//   | "title"
//   | "description"
//   | "created_at"
// > &
//   Pick<User, "user_id" | "username" | "email" | "created_at"> & {
//     likes_count: bigint;
//   };

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type

type TokenContent = Pick<User, "user_id">;

// type MediaItemWithOwner = MediaItem & Pick<User, "username">;

// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

export type {
  User,
  Comment,
  Like,
  Rating,
  Tag,
  MediaItemTag,
  TagResult,
  UploadResult,
  TokenContent,
  FileInfo,
  UnauthorizedUser,
  TokenUser,
  PutUserValues,
  UserHabits,
  Post,
};
