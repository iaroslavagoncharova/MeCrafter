// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./styles.css";
import Feed from "./components/Feed";
import HabitSearch from "./components/HabitSearch";
import Browse from "./components/Browse";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Explore from "./components/Explore";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
