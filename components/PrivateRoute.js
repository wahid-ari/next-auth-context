import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from "@utils/AuthContext";
import FullPageLoader from './FullPageLoader';

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // check the current route is in protectedRoutes or not
  // if the current route is found in protectedRoutes (!== -1), then the route is protected
  // The indexOf() method returns the first index at which a given element can be found in the array, 
  // or - 1 if it is not present.
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, pathIsProtected]);

  if ((isLoading || !isAuthenticated) && pathIsProtected) {
    return <FullPageLoader />;
  }

  return children;
}