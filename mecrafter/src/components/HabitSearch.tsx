import { useState } from "react";

export default function HabitSearch() {
  const [habit, setHabit] = useState("");
//   const handleHabitInput = (selectedCategory: string) => {
//     setSelectedCategory(selectedCategory);
//   };

  return (
    <form id="habit-form" className="form-group">
      <label htmlFor="habit-search" className="form-label">
        Create a new habit
      </label>
      <input
        type="text"
        placeholder="E.g. eat at home at least twice a week"
        id="habit-search"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        className="form-control text-center"
        required
      ></input>
      <button type="submit" id="submit-button" className="btn btn-primary">Add habit</button>
    </form>
  );
}
