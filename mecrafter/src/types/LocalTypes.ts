import { User } from "./DBTypes";
export type Values = Pick<User, "username" | "password">;
export type AuthContextType = {
    user: User | null;
    handleLogin: (values: Values) => void;
    handleLogout: () => void;
    handleAutoLogin: () => void;
};