import { useEffect, useRef } from "react";
import { PostWithOwner } from "../types/DBTypes";
import { useCommentStore } from "../store";
import { useUserContext } from "../hooks/contextHooks";
import { useComment } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

const Comments = ({ post }: { post: PostWithOwner }) => {
  const {comments, setComments} = useCommentStore();
  const { user } = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const { getCommentsByPostId, postComment } = useComment();

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
      await getComments();
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(comment, values);

  const getComments = async () => {
    try {
      const comments = await getCommentsByPostId(post.post_id);
      setComments(comments);
    } catch (error) {
      console.log((error as Error).message);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user && (
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
      {comments.length > 0 ? (
        <ul className="list-group">
            {comments.map((comment) => (
                <li key={comment.comment_id} className="list-group-item">
                    <h5>{comment.username}</h5>
                    <p>{comment.comment_text}</p>
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
