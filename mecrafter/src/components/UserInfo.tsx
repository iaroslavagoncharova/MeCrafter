import { useEffect, useState } from "react";
import { UnauthorizedUser } from "../types/DBTypes";
import { useUserContext } from "../hooks/contextHooks";

export default function UserInfo({ user }: { user: UnauthorizedUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const {handleEdit} = useUserContext();
  const {handleDelete} = useUserContext();
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    const username = document.querySelector(".userinfo input[type='text']") as HTMLInputElement;
    const email = document.querySelector(".userinfo input[type='email']") as HTMLInputElement;
    const password = document.querySelector(".userinfo input[type='password']") as HTMLInputElement;
    const values = {
      username: username?.value,
      email: email?.value,
      password: password?.value
    };
    handleEdit(values);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      handleDelete();
    }
  };
  useEffect(() => {
  }, [user]);
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
                    <span>{user.username}</span>
                  </p>
                  <p className="mb-0">
                    <span>Joined on {new Date(user.created_at).toLocaleDateString('fi-FI')}</span>
                  </p>
                  <p className="mb-0">
                    <span>{user.email}</span>
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
                <button className="btn btn-danger btn-block" onClick={handleDeleteClick}>
                  Delete</button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
