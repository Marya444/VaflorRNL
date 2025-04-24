import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });
    const { token, user } = response.data;
    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = async () => {
    await axios.post("http://127.0.0.1:8000/api/logout");
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  // SignUp function (added)
  const signup = async (name: string, email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:8000/api/signup", {
      name,
      email,
      password,
    });
    const { token, user } = response.data;
    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, signup, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
