import { useState } from "react";
import { UserHabits } from "../types/DBTypes";

export default function HabitInfo({ userHabits }: { userHabits: UserHabits | null })
{
  const [editHabit, setEditHabit] = useState(false);
  const [editFrequency, setEditFrequency] = useState(false);
  const [frequency, setFrequency] = useState("");

  const handleEditClick = () => {
    setEditHabit(true);
    localStorage.setItem("habit", JSON.stringify(userHabits));
  };

  const handleFrequencyEdit = () => {
    setEditFrequency(true);
    localStorage.setItem("frequency", JSON.stringify(userHabits));
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
                    onClick={() => (window.location.href = "/explore")}
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
                  <p className="mb-0">{userHabits?.habit_description || 'Not set'}</p>
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
            {editFrequency ? (
              <>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Set a new frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <button className="btn btn-primary btn-block" onClick={() => setEditFrequency(false)}>
                    Save</button>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={() => setEditFrequency(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="col-sm-5">
                  <h4 className="mb-0">Current frequency:</h4>
                </div>
                <div className="col-sm-5">
                  {frequency === "" ? <p className="mb-0">Not set</p> : 
                  <p className="mb-0">{frequency} times a week</p>}
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleFrequencyEdit}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
