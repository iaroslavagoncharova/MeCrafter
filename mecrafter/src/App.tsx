// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import Feed from "./views/Feed";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Profile from "./views/Profile";
import Explore from "./views/Explore";
import { useState } from "react";
import { UserHabits } from "./types/DBTypes";

function App() {
  const [userHabits, setUserHabits] = useState<UserHabits | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const addHabit = (habit: UserHabits) => {
    setUserHabits(habit);
  };
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main setSelectedCategory={setSelectedCategory}/>} />
        <Route path="/explore" element={<Explore onAddHabit={addHabit} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile userHabits={userHabits} />} />
      </Routes>
    </Router>
  );
}

export default App;
