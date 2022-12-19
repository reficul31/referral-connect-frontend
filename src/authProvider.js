import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const value = useMemo(() => {
    const login = (data) => {
        setUser(data);
    };

    const logout = () => {
        setUser(null);
    };
      
    return {user, login, logout}
    }, [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};