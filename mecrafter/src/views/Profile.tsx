import UserInfo from "../components/UserInfo";
import HabitInfo from "../components/HabitInfo";
import { UserHabits } from "../types/DBTypes";

export default function Profile({userHabits}: {userHabits: UserHabits | null}) {
  return (
    <div>
      <h1>Profile</h1>
      <div className="row align-items-center justify-content-center">
        <UserInfo />
      </div>
      <div className="row align-items-center justify-content-center">
        <HabitInfo userHabits={userHabits} />
      </div>
    </div>
  );
}
