import { useState } from "react";
import { usePost } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";
import { PostWithOwner } from "../types/DBTypes";
import { useForm } from "../hooks/formHooks";
import Likes from "./Likes";
import Comments from "./Comments";

const FeedPost = (props: { post: PostWithOwner }) => {
  const { post } = props;
  const { user } = useUserContext();
  const { putPost, deletePost } = usePost();
  const [editing, setEditing] = useState(false);

  const values = {
    post_title: "",
    post_text: "",
  };

  const handleDelete = async () => {
    const check = confirm("Are you sure you want to delete this post?");
    if (!check) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const result = await deletePost(post.post_id, token);
      alert(result.message);
      console.log(result, "result");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const edit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user || user.user_id !== post.user_id || !post) {
        return;
      }
      const result = await putPost(post.post_id, inputs, token);
      alert(result.message);
      setEditing(false);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(edit, values);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-2">
            <p>{post.username}</p>
            <p>{new Date(post.created_at).toLocaleDateString("fi-FI")}</p>
          </div>
          {editing === false ? (
            <div className="col-md-9">
              <ul className="list-group">
                <li key={post.post_id} className="list-group-item">
                  <h3 className="card-title text-center">{post.post_title}</h3>
                  <p className="card-text text-center">{post.post_text}</p>
                  <img
                    src={post.thumbnail}
                    alt={post.post_title}
                    className="img-fluid mx-auto d-block"
                  />
                  {user?.user_id === post.user_id ? (
                    <>
                      <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <Likes post={post} />
                      <Comments post={post} />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (user) {
                            console.log("Comment on post", post.post_id);
                          } else {
                            alert(
                              "You need to be logged in to comment on a post"
                            );
                          }
                        }}
                      >
                        Comment
                      </button>
                    </>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <div className="col-md-9">
              <ul className="list-group">
                <li key={post.post_id} className="list-group-item">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="post_title"
                      id="post_title"
                      placeholder={post.post_title}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="post_text"
                      id="post_text"
                      placeholder={post.post_text}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        inputs.post_title || inputs.post_text ? false : true
                      }
                    >
                      Save
                    </button>
                  </form>
                  <button onClick={() => setEditing(false)}>Cancel</button>
                </li>
              </ul>
            </div>
          )}
          <div className="col-md-1">
            <p>Likes: 50</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3>Comments</h3>
            <Comments post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
