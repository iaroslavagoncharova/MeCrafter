import React, { createContext, useState } from "react";
import { AuthContextType, Values } from "../types/LocalTypes";
import { useAuth, useUser } from "../hooks/apiHooks";
import { User } from "../types/DBTypes";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const { postLogin } = useAuth();
    const {getUserByToken} = useUser();
    const navigate = useNavigate();

    const handleLogin = async (values: Values) => {
        try {
            const result = await postLogin(values);
            if (result) {
                localStorage.setItem('token', result.token);
                setUser(result.user);
                navigate('/');
            }
        } catch (error) {
            alert((error as Error).message)
        }
    };

    const handleLogout = () => {
        try {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
        } catch (error) {
            alert((error as Error).message)
        }
    };

    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const result = await getUserByToken(token);
                setUser(result.user);
                console.log(result.user);
                navigate('/');
            }
        } catch(e) {
            console.log((e as Error).message);
        }
    };
    
    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };