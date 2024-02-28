/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import Feed from "./views/Feed";
import Main from "./views/Main";
import Profile from "./views/Profile";
import Explore from "./views/Explore";
import { useState } from "react";
import { UserHabits } from "./types/DBTypes";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./views/Layout";
import RegisterPage from "./views/AuthPage";
import HabitTracker from "./views/HabitTracker";

const App = () => {
  const [userHabits, setUserHabits] = useState<UserHabits | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const addHabit = (habit: UserHabits) => {
    setUserHabits(habit);
    console.log(userHabits);
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Main setSelectedCategory={setSelectedCategory} />}
            />
            <Route
              path="/explore"
              element={
                <Explore
                  onAddHabit={addHabit}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              }
            />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/tracker" element={<HabitTracker />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
