import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    try {
      const stored = localStorage.getItem("authTokens");
      if (!stored || stored === "undefined") return null;

      const parsed = JSON.parse(stored);
      const decoded = jwtDecode(parsed.access);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("authTokens");
        return null;
      }

      return parsed;
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

  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access);
      const exp = decoded.exp * 1000;
      const now = Date.now();

      if (exp < now) {
        logout();
      } else {
        const timeout = exp - now;
        const timer = setTimeout(() => {
          logout();
        }, timeout);

        return () => clearTimeout(timer);
      }
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider
      value={{ authTokens, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
