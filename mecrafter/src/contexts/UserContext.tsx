import React, { createContext, useState } from "react";
import { AuthContextType, EditValues, Values } from "../types/LocalTypes";
import { useAuth, useUser } from "../hooks/apiHooks";
import { User } from "../types/DBTypes";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { postLogin } = useAuth();
  const { getUserByToken, putUser, deleteUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (values: Values) => {
    try {
      const result = await postLogin(values);
      if (result) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        navigate("/");
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const result = await getUserByToken(token);
        console.log(result.user);
        setUser(result.user);
        const origin = location.state.from.pathname || '/';
        navigate(origin);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleEdit = async (values: EditValues) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await putUser(values, token);
        const result = await getUserByToken(token);
        setUser(result.user);
        navigate("/");
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await deleteUser(token);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, handleAutoLogin, handleEdit, handleDelete }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
