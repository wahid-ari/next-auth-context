import { useEffect, useContext } from "react";
import { AuthContext } from "@utils/AuthContext";
import Router from "next/router";
import nookies from 'nookies'

export default function Logout() {
  const {setIsAuthenticated, setUser} = useContext(AuthContext);

  useEffect(() => {
    setIsAuthenticated(false);
    setUser(null);
    nookies.destroy(null, 'token');
    nookies.destroy(null, 'username');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    Router.replace("/login");
  }, []);

  return ("")
}