import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
const { user, handleAutoLogin } = useUserContext();
const token = localStorage.getItem("token");
if (!user && token) {
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
