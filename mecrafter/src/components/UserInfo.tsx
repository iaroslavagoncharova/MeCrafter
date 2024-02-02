import { useState } from "react";

export default function UserInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };
  
  return (
    <div className="col-md-6 content-left">
      <div className="card">
        <div className="card-body">
          {isEditing ? (
            <div>
              <div className="row align-items-center justify-content-center">
                <div className="col-sm-4 avatar-change">
                  <input type="file" className="form-control" id="file"/>
                  <label htmlFor="file">Upload a new avatar</label>
                </div>
                <div className="col-sm-8 userinfo">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new username"
                  />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter a new email"
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter a new password"
                  />
                </div>
              </div>
              <div className="row align-items-center justify-content-center">
                <div className="col-6">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="row">
                <div className="col-6">
                  <img
                    src="https://i.imgur.com/CFpa3nK.jpg"
                    alt="avatar image"
                    className="img-fluid"
                  />
                </div>
                <div className="col-6 userinfo">
                  <p className="mb-0">
                    <span>Happy User</span>
                  </p>
                  <p className="mb-0">
                    <span>Joined on 26.01.2024</span>
                  </p>
                  <p className="mb-0">
                    <span>happyuser@example.com</span>
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6">
                <button className="btn btn-primary btn-block" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-danger btn-block">Delete</button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
