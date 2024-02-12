import { MediaItemWithOwner } from "../types/DBTypes";

const FeedPost = (props: { post: MediaItemWithOwner }) => {
  const { post } = props;
  return (
<div className="card">
  <div className="card-body">
    <div className="row">
      {/* Image on the left */}
      <div className="col-md-3">
        <img src={post.thumbnail} alt={post.title} className="img-fluid" />
      </div>
      {/* Rest of the content on the right */}
      <div className="col-md-9">
        <ul className="list-group">
          <li key={post.media_id} className="list-group-item">
            <h5>{post.username}</h5>
            <p>{post.title}</p>
            <p>{post.description}</p>
            <p>
              Posted on the{" "}
              {new Date(post.created_at).toLocaleDateString("fi-FI")}
            </p>
            <p>{post.filesize}</p>
            <p>{post.media_type}</p>
            <button className="btn btn-primary">Like</button>
            <button className="btn btn-primary">Comment</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  );
};

export default FeedPost;
