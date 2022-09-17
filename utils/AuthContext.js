import React, { createContext, useState, useEffect } from 'react';
import nookies from 'nookies'
import jwt from "jsonwebtoken";
import Router from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

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
    setIsAuthenticated(false);
    setUser(null);
    nookies.destroy(null, 'token')
    nookies.destroy(null, 'username')
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
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
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}