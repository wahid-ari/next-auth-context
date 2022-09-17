import { useEffect, useContext } from "react";
import { AuthContext } from "@utils/AuthContext";
import Router from "next/router";
import nookies from 'nookies'

export default function Logout() {
  const { setIsAuthenticated, setIsLogin, setUser} = useContext(AuthContext);

  useEffect(() => {
    nookies.destroy(null, 'token');
    nookies.destroy(null, 'username');
    localStorage.setItem("login", false);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setIsAuthenticated(false);
    setIsLogin(false);
    setUser(null);
    Router.replace("/login");
  }, []);

  return ("")
}