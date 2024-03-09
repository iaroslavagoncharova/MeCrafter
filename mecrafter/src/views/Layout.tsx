import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();
  const token = localStorage.getItem("token");
  console.log(token);

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <nav id="nav">
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
