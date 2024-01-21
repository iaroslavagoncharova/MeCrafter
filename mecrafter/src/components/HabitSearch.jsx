import React from "react";
import { useState } from "react";

export default function HabitSearch() {
    const [habit, setHabit] = useState("");
    
    return (
        <form id="habit-form" onSubmit={setHabit} className="form-group">
            <label htmlFor="habit-search" className="form-label">Search for a habit</label>
            <input type="text" placeholder="E.g. eat at home at least twice a week" id="habit-search" value={habit} onChange={(e) => setHabit(e.target.value)} className="form-control text-center" required></input>
            <button type="submit" id="submit-button" className="btn btn-primary">Search</button>
        </form>
    )
}