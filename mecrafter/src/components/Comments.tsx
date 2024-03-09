import { useEffect, useRef } from "react";
import { PostWithOwner } from "../types/DBTypes";
import { useCommentStore } from "../store";
import { useUserContext } from "../hooks/contextHooks";
import { useComment } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

const Comments = ({ post }: { post: PostWithOwner }) => {
  const { comments, setComments } = useCommentStore();
  const { user } = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const { postComment, getComments, deleteComment } = useComment();

  const values = {
    comment_text: "",
  };

  const comment = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user || !post) {
      return;
    }
    try {
      await postComment(inputs.comment_text, post.post_id, token);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(comment, values);

  const getAllComments = async () => {
    try {
      const comments = await getComments();
      setComments(comments);
    } catch (error) {
      console.log((error as Error).message);
      setComments([]);
    }
  };

  const postComments = comments.filter(
    (comment) => comment.post_id === post.post_id && comment.comment_text !== ""
  );

  const handleDelete = async (commentId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const result = await deleteComment(commentId, token);
      alert(result.message);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    getAllComments();
  }, [setComments]);

  return (
    <>
      {user && user.user_id !== post.user_id && (
        <>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="comment_text">Comment</label>
              <input
                type="text"
                name="comment_text"
                id="comment_text"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Comment
            </button>
          </form>
        </>
      )}
      {postComments.length > 0 ? (
        <ul className="list-group">
          {postComments.map((comment) => (
            <li key={comment.comment_id} className="list-group-item">
              <h5>{comment.username}</h5>
              <p>{comment.comment_text}</p>
              {user?.user_id === comment.user_id && (
                <button className="btn btn-danger" onClick={() => handleDelete(comment.comment_id!)}>
                  Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </>
  );
};

export default Comments;
