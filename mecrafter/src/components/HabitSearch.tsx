import { useNavigate } from "react-router-dom";
import { useHabit } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

export default function HabitSearch() {
  const values = { habit_name: "", habit_description: "", habit_category: "" };
  const {postHabit} = useHabit();
  const navigate = useNavigate();

  const addHabit = async () => {
    try {
      const token = localStorage.getItem("token");
      const habit = {
        habit_name: inputs.habit_name,
        habit_description: inputs.habit_description,
        habit_category: inputs.habit_category,
      };
      if (token) {
        await postHabit(
          habit,
          token
        );
        alert("Habit added");
        navigate('/profile')
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(addHabit, values);

  return (
    <form id="habit-form" className="form-group" onSubmit={handleSubmit}>
      <label htmlFor="habit-search" className="form-label">
        Create a new habit
      </label>
      <input
        type="text"
        id="habit-name"
        name="habit_name"
        className="form-control"
        placeholder="Enter a new habit, e.g. 'drink water'"
        onChange={handleInputChange}
      />
      <input
        type="text"
        id="habit-description"
        name="habit_description"
        className="form-control"
        placeholder="Enter a description"
        onChange={handleInputChange}
      />
      <select id="habit-category" className="form-select" name="habit_category" onChange={handleInputChange}>
        <option value="">Select a category</option>
        <option value="Health">Health</option>
        <option value="Productivity">Productivity</option>
        <option value="Relationships">Relationships</option>
        <option value="Finance">Finance</option>
        <option value="Self-care">Self-care</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit" id="submit-button" className="btn btn-primary">
        Add habit
      </button>
    </form>
  );
}
