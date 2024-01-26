import React from "react";
import UserInfo from "./UserInfo";
import HabitInfo from "./HabitInfo";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <div className="row align-items-center justify-content-center">
        <UserInfo />
      </div>
      <div className="row align-items-center justify-content-center">
        <HabitInfo />
      </div>
    </div>
  );
}
