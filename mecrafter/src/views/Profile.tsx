import UserInfo from "../components/UserInfo";
import HabitInfo from "../components/HabitInfo";
import { useUserContext } from "../hooks/contextHooks";

export default function Profile() {
  const { user } = useUserContext();
  const { handleLogout } = useUserContext();
  return (
    <div className="container text-center">
      <h1>Profile</h1>
      {user && (
        <>
          <h2>Welcome, {user.username}!</h2>
          <div className="row align-items-center justify-content-center">
            <UserInfo user={user} />
          </div>
          <div className="row align-items-center justify-content-center">
            <HabitInfo />
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
