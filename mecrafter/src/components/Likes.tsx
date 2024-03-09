import { useEffect, useReducer } from "react";
import { PostWithOwner, Like } from "../types/DBTypes";
import { useLike } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: "setLikeCount" | "userLike";
  count?: number;
  userLike?: Like | null;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case "setLikeCount":
      return { ...state, count: action.count ?? 0 };
    case "userLike":
      if (action.userLike !== undefined) {
        return { ...state, userLike: action.userLike };
      }
      return state;
  }
  return state;
};

const Likes = ({ post }: { post: PostWithOwner }) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const { postLike, getCountByPost, getLikeByUserAndPost, deleteLike } =
    useLike();
  const { user } = useUserContext();
  const getLikes = async () => {
    const token = localStorage.getItem("token");
    if (!post || !token || !user) return;
    try {
      const userLike = await getLikeByUserAndPost(post.post_id, token);
      console.log(userLike);
      likeDispatch({ type: "userLike", userLike: userLike });
    } catch (error) {
      likeDispatch({ type: "userLike", userLike: null });
      console.log("getLikeByUser error", (error as Error).message);
    }
  };

  const getCount = async () => {
    try {
      const count = await getCountByPost(post.post_id);
      likeDispatch({ type: "setLikeCount", count: count.count });
    } catch (error) {
      likeDispatch({ type: "setLikeCount", count: 0 });
      console.log("getCountByPost error", (error as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getCount();
  }, [post]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!post || !token || !user) return;
      if (user.user_id === post.user_id) {
        alert("You can't like your own post");
        return;
      }
      if (likeState.userLike) {
        await deleteLike(likeState.userLike.like_id, token);
        likeDispatch({ type: "setLikeCount", count: likeState.count - 1 });
        likeDispatch({ type: "userLike", userLike: null });
      } else {
        await postLike(post.post_id, token);
        getLikes();
        getCount();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <>
      Likes: {likeState.count}
      {user?.user_id === post.user_id ? null : likeState.userLike ? (
        <button onClick={handleLike}>Unlike</button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
    </>
  );
};

export default Likes;
