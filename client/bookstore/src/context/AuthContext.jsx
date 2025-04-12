import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    try {
      const stored = localStorage.getItem("authTokens");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error parsing authTokens:", err);
      return null;
    }
  });


  const login = (userData) => {
    localStorage.setItem("authTokens", JSON.stringify(userData));
    setAuthTokens(userData);
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
  };

  const isAuthenticated = !!authTokens;

  return (
    <AuthContext.Provider
      value={{ authTokens, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
