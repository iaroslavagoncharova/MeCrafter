import { create } from "zustand";
import { Comment } from "./types/DBTypes";

type CommentWithUser = Partial<Comment & { username: string }>;

type CommentStore = {
  comments: CommentWithUser[];
  setComments: (comments: CommentWithUser[]) => void;
  addComment: (comment: CommentWithUser) => void;
};

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) =>
    set(() => ({
      comments: comments,
    })),
addComment: (comment) =>
set((state) => ({
    comments: [
        ...state.comments,
        {
            comment_id: state.comments.length + 1,
            post_id: comment.post_id,
            user_id: comment.user_id,
            comment_text: comment.comment_text,
            created_at: comment.created_at,
            username: comment.username,
        }
    ]
})),
}));
