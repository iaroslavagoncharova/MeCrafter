import React, { useState } from "react";
import { useFile, useMedia } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/formHooks";

const CreatePost = () => {
  const [file, setFile] = useState<File | null>(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const values = {
    title: "",
    description: "",
  };

  const upload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !file) {
        return;
      }
      const fileResult = await postFile(file, token);
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult.message);
      navigate('/feed')
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(upload, values);

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body"  id="post-form">
          <h5 className="card-title">Create a new post</h5>
          <p className="card-text">
            What's on your mind? Share it with the community!
          </p>
          <form onSubmit={handleSubmit} id="post-form-group">
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title of your post"
                onChange={handleInputChange}
              />
              <textarea
                className="form-control"
                id="postContent"
                rows={3}
                placeholder="Write your post here"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="file" className="form-control-file" id="postImage" accept="image/*, video/*"
              onChange={handleFileChange} />
            </div>
            <img src={file ? URL.createObjectURL(file) : 'https://via.placeholder.com/200?text=Choose+image'}
            alt="preview" width="200" />
            <button id="post-btn" type="submit" className="btn btn-primary" disabled={file && inputs.title.length > 3 ? false : true} >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
