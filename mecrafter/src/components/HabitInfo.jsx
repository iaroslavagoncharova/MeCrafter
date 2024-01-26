import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HabitInfo() {
  const [editHabit, setEditHabit] = useState(false);
  const [editFrequency, setEditFrequency] = useState(false);

  const handleEditClick = () => {
    setEditHabit(true);
  };

  return (
    <div className="col-md-6 content-right">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center justify-content-center">
            {editHabit ? (
              <>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Create a custom habit"
                  />
                </div>
                <div className="col-4">
                  <button className="btn btn-primary btn-block">Save</button>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={() => setEditHabit(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="row">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => (window.href = "/explore")}
                  >
                    Browse all habits
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="col-sm-5">
                  <h4 className="mb-0">Current habit:</h4>
                </div>
                <div className="col-sm-5">
                  <p className="mb-0">Eat healthy food</p>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-primary" onClick={handleEditClick}>
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-5">
              <h4 className="mb-0">Current frequency:</h4>
            </div>
            <div className="col-sm-5">
              <p className="mb-0">3 times a week</p>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
