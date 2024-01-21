import React from "react";
import Browse from "./Browse";
import HabitSearch from "./HabitSearch";

export default function Main() {
  return (
    <>
      <h1>Welcome to MeCrafter, love!</h1>
      <p>
        This is a place for you to change your life and incorporate new habits
        into your daily routine with love and care.
      </p>
      <main id="main">
        <div className="container text-center align-items-center">
          <div className="row align-items-center">
            <div id="search" className="col">
              <HabitSearch />
            </div>
            <div className="w-100 d-none d-s-block"></div>
            <Browse />
          </div>
        </div>
      </main>
    </>
  );
}
