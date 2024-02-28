import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { Values } from "../types/LocalTypes";
import {
  LoginResponse,
  MessageResponse,
  PostResponse,
  UploadResponse,
  UserResponse,
} from "../types/MessageTypes";
import {
  Comment,
  Like,
  Post,
  PostWithOwner,
  PutUserValues,
  User,
  UserHabits,
} from "../types/DBTypes";

const usePost = () => {
  const [postArray, setPostArray] = useState<PostWithOwner[]>([]);

  const getPosts = async () => {
    try {
      const posts = await fetchData<Post[]>(
        import.meta.env.VITE_MEDIA_API + "/posts"
      );
      const postsWithOwner: PostWithOwner[] = await Promise.all(
        posts.map(async (post) => {
          const owner = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + "/users/" + post.user_id
          );
          const postWithOwner: PostWithOwner = {
            ...post,
            username: owner.username,
          };
          return postWithOwner;
        })
      );
      setPostArray(postsWithOwner);
      console.log("postArray updated:", postArray);
    } catch (error) {
      console.error("getPosts failed", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const postPost = (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string
  ) => {
    const post: Omit<Post, "post_id" | "user_id" | "thumbnail" | "created_at"> =
      {
        post_title: inputs.post_title,
        post_text: inputs.post_text,
        filename: file.data.filename,
        filesize: file.data.filesize,
        media_type: file.data.media_type,
      };

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };
    console.log(options);
    return fetchData<PostResponse>(
      import.meta.env.VITE_MEDIA_API + "/posts",
      options
    );
  };

  const putPost = async (
    id: number,
    inputs: Record<string, string>,
    token: string
  ): Promise<PostResponse> => {
    let post = {};
    if (inputs.post_title && inputs.post_text) {
      post = {
        post_title: inputs.post_title,
        post_text: inputs.post_text,
      };
    } else if (inputs.post_title) {
      post = {
        post_title: inputs.post_title,
      };
    } else if (inputs.post_text) {
      post = {
        post_text: inputs.post_text,
      };
    }
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(post),
    };
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + "/posts/" + id,
      options
    );
  };

  const deletePost = async (
    id: number,
    token: string
  ): Promise<MessageResponse> => {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + "/posts/" + id,
      options
    );
  };

  return { getPosts, postPost, postArray, putPost, deletePost };
};

const useUser = () => {
  const getUserById = async (id: number) => {
    return await fetchData<User>(import.meta.env.VITE_AUTH_API + "/users/" + id);
  };

  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + "/users/token/",
      options
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    await fetchData(import.meta.env.VITE_AUTH_API + "/users", options);
  };

  const putUser = async (user: PutUserValues, token: string) => {
    console.log(user);
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    };
    await fetchData(import.meta.env.VITE_AUTH_API + "/users", options);
    console.log(user, token);
  };

  const deleteUser = async (token: string) => {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    await fetchData(import.meta.env.VITE_AUTH_API + "/users", options);
  };

  const getUsernameAvailability = async (username: string) => {
    return await fetchData<{ available: boolean }>(
      import.meta.env.VITE_AUTH_API + "/users/username/" + username
    );
  };

  const getEmailAvailability = async (email: string) => {
    return await fetchData<{ available: boolean }>(
      import.meta.env.VITE_AUTH_API + "/users/email/" + email
    );
  };
  return {
    getUserByToken,
    postUser,
    putUser,
    deleteUser,
    getUsernameAvailability,
    getEmailAvailability,
    getUserById,
  };
};

const useAuth = () => {
  const postLogin = async (values: Values) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    return await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      options
    );
  };
  return { postLogin };
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
    console.log(options, import.meta.env.VITE_UPLOAD_SERVER + "/upload");
    console.log(formData, "formData", file, "file");
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + "/upload",
      options
    );
  };

  return { postFile };
};

const useHabit = () => {
  const [habits, setHabits] = useState<UserHabits[]>([]);

  const getCreated = async () => {
    try {
      const options = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const createdHabits = await fetchData<UserHabits[]>(
        import.meta.env.VITE_AUTH_API + "/habits",
        options
      );
      setHabits(createdHabits);
    } catch (error) {
      console.error("getCreated failed", error);
    }
  };

  useEffect(() => {
    getCreated();
  }, []);

  const postHabit = async (habit: Record<string, string>, token: string) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(habit),
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + "/habits", options);
  };

  const postFrequency = async (
    frequency: Record<string, string>,
    token: string
  ) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(frequency),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + "/habits/frequency",
      options
    );
  };

  const updateHabit = async (habit: Record<string, string>, token: string) => {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(habit),
    };
    console.log(habit);
    console.log(options);
    console.log(import.meta.env.VITE_AUTH_API + "/habits/habit" + options);
    const result = await fetchData(
      import.meta.env.VITE_AUTH_API + "/habits/habit",
      options
    );
    console.log(result);
    return result;
  };

  return { getCreated, postHabit, postFrequency, habits, updateHabit };
};

const useLike = () => {
  const postLike = async (post_id: number, token: string) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id }),
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + "/likes",
      options
    );
  };

  const getCountByPost = async (post_id: number) => {
    return await fetchData<{count: number}>(
      import.meta.env.VITE_MEDIA_API + "/likes/count/" + post_id,
    )
  };

  const getLikeByUser = async (post_id: number, token: string) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await fetchData<Like>(
      import.meta.env.VITE_MEDIA_API + "/likes/bypost/user" + post_id,
      options
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + "/likes/" + like_id,
      options
    );
  };
  return { postLike, getCountByPost, getLikeByUser, deleteLike };
};

const useComment = () => {
  const postComment = async (
    comment_text: string,
    post_id: number,
    token: string) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ comment_text, post_id }),
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + "/comments",
      options
    );
};

const {getUserById} = useUser();

const getCommentsByPostId = async (post_id: number) => {
  const comments = await fetchData<Comment[]>(
    import.meta.env.VITE_MEDIA_API + "/comments/bypost/" + post_id,
  );
  const commentsWithUser = await Promise.all<Comment & {username: string}>(
    comments.map(async (comment) => {
      const user = await getUserById(comment.user_id);
      return {...comment, username: user.username};
    }
  ));
  return commentsWithUser;
};


return { postComment, getCommentsByPostId };
};
export { useUser, useAuth, useFile, useHabit, usePost, useLike, useComment };
