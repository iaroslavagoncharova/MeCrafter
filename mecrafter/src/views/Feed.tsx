import CreatePost from "../components/CreatePost";
import FeedPost from "../components/FeedPost";
import { useMedia } from "../hooks/apiHooks";
import { Link } from "react-router-dom";

export default function Feed() {
  const { mediaArray } = useMedia();
  const token = localStorage.getItem("token");
  return (
    <div className="row justify-content-center">
      <h1>Feed</h1>
      <p>Welcome to the feed! Here you can see what other users are up to.</p>
      {token ? (
        <CreatePost />
      ) : (
        <>
          <p>Create a profile to share your thoughts with the world!</p>
          <button className="btn btn-primary">
            <Link to="/signup">Take me there</Link>
          </button>
        </>
      )}
      <div className="col-md-8">
      {mediaArray.map((item) => (
        <FeedPost key={item.media_id} post={item} />
      ))}
      </div>
    </div>
  );
}
