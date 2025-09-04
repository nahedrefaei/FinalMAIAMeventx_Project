// src/components/Auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginService,
  registerService,
  logoutService,
  meService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      console.log('AuthContext: Checking for stored token...');
      const storedToken = localStorage.getItem("token"); // 👈 check localStorage
      if (!storedToken) {
        console.log('AuthContext: No token found in localStorage');
        setLoading(false);
        return;
      }

      console.log('AuthContext: Token found, fetching user data...');
      setToken(storedToken); // Set token in state
      try {
        const { data } = await meService(); // 👈 don't pass token, let interceptor handle it
        console.log('AuthContext: User data received:', data);
        setUser(data); // 👈 use data directly, not data.user
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token"); // clear broken token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginService(credentials);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await registerService(payload);
    localStorage.setItem("token", data.token); // save token too
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };


  const logout = async () => {
    try {
      await logoutService();
    } catch (e) {
      console.warn("Logout request failed, clearing local session anyway");
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
    {loading ? (
      <div>Loading...</div> // or a spinner
    ) : (
      children
    )}
  </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
