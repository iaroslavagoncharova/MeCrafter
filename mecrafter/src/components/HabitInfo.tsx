import { useState } from "react";
import { useUserContext } from "../hooks/contextHooks";
import { useHabit } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

export default function HabitInfo() {
  const values = { habit_frequency: "" };
  const { postFrequency } = useHabit();

  const [editFrequency, setEditFrequency] = useState(false);

  const {user} = useUserContext();

  const addFrequency = async () => {
    setEditFrequency(false);
    try {
      const token = localStorage.getItem("token");
      const frequency = {
        habit_frequency: inputs.habit_frequency,
      };
      if (token) {
        await postFrequency(
          frequency,
          token
        );
        alert("Frequency changed!");
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleClick = () => {
    const origin = location.pathname;
    localStorage.setItem("origin", origin);
    location.pathname = "/explore";
  }

  const {handleSubmit, handleInputChange, inputs} = useForm(addFrequency, values);

  return (
    <div className="col-md-6 content-right">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center justify-content-center">
                <div className="col-sm-5">
                  <h4 className="mb-0">Current habit:</h4>
                </div>
                <div className="col-sm-5">
                  <p className="mb-0">{user?.habit_name || "Not set"}</p>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-primary" onClick={handleClick}>
                    Pick new habit
                  </button>
                </div>
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
                    name="habit_frequency"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
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
                  <p className="mb-0">
                  {user?.habit_frequency} 
                    {user?.habit_frequency === 1 ? ' time a week' : ' times a week' || "Not set"}
                  </p>
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditFrequency(true)}
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
