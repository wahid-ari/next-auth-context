import React, { createContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import jwt from "jsonwebtoken";
import Router from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cookies = nookies.get('token')
  const token = cookies.token !== undefined ? cookies.token : ""

  useEffect(() => {
    setIsLogin(localStorage.getItem('login'))
  })

  useEffect(() => {
    setIsLogin(localStorage.getItem('login'))
    const cookies = nookies.get('token');
    const token = cookies.token;
    if (!(token === null || token === undefined)) {
      const decoded = jwt.decode(token);
      setUser({
        username: decoded.username,
        token: token
      });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null)
    }
    setIsLoading(false);
  }, [isAuthenticated, isLogin]);

  function logout() {
    nookies.destroy(null, 'token');
    nookies.destroy(null, 'username');
    localStorage.setItem("login", false);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setIsAuthenticated(false);
    setIsLogin(false);
    setUser(null);
    Router.replace("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLogin,
        setIsLogin,
        user,
        setUser,
        token,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}