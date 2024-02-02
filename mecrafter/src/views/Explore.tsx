import { useState } from "react";
import defaultHabits from "../habits";
import { UserHabits } from "../types/DBTypes";

export default function Explore({
  onAddHabit,
  selectedCategory,
  setSelectedCategory,
}: {
  onAddHabit: (habit: UserHabits) => void;
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
}) {
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const filteredHabits = defaultHabits.filter(
    (habit) =>
      (habit.habit_category === filter || filter === "") &&
      (habit.habit_category === selectedCategory || selectedCategory === "") &&
      (habit.habit_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        searchInput === "" ||
        habit.habit_description
          .toLowerCase()
          .includes(searchInput.toLowerCase()))
  );

  const resetFilters = () => {
    setFilter("");
    setSelectedCategory("");
    setSearchInput("");
  };

  return (
    <>
      <h1>Explore</h1>
      <p>Explore new habits to incorporate into your daily routine</p>
      {filter || selectedCategory ? (
        <p>Category: {filter || selectedCategory}</p>
      ) : null}
      <div id="explore-content" className="row">
        <div className="col-md-4 content-left">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center justify-content-center">
                <div id="search-input" className="row">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a habit"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <div className="row">
                  <select
                    className="form-select"
                    value={selectedCategory ? selectedCategory : filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="">Pick a category</option>
                    <option value="Health">Health</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Finance">Finance</option>
                    <option value="Self-care">Self-care</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                <div className="col-sm-4">
                  <button
                    id="reset-btn"
                    className="btn btn-secondary btn-block"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 content-right">
          <div id="habit-cards-div" className="card">
            <div className="card-body">
              <div className="row">
                {filteredHabits.map((habit) => (
                  <div key={habit.habit_id} className="col-12 mb-3 col-md-6">
                    <div id="habit-card" className="card text-center">
                      <div className="card-body">
                        <h5 className="card-title">{habit.habit_name}</h5>
                        <p className="card-text">{habit.habit_description}</p>
                        <p>Category: {habit.habit_category}</p>
                        <button
                          className="btn btn-primary btn-block"
                          onClick={() => onAddHabit(habit)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}