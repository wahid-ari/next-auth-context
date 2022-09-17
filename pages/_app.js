import { GlobalProvider } from "@utils/GlobalContext";
import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import { AuthProvider } from "@utils/AuthContext";
import PrivateRoute from "@components/PrivateRoute";
import "@styles/globals.css";

function MyApp({ Component, pageProps }) {
  // Add your protected routes here
  // by specific route
  // const protectedRoutes = ['/admin/first','/admin/second'];
  // by folder
  const protectedRoutes = ['/admin'];

  return (
    <GlobalProvider>
      <AuthProvider>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <AxiosConfigProvider>
            <Component {...pageProps} />
          </AxiosConfigProvider>
        </PrivateRoute>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MyApp
