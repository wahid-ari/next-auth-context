import { GlobalProvider } from "@utils/GlobalContext";
import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import { AuthProvider } from "@utils/AuthContext";
import PrivateRoute from "@components/PrivateRoute";
import "@styles/globals.css";

function MyApp({ Component, pageProps }) {
  // Add your protected routes here
  const protectedRoutes = [
    '/admin/first',
    '/admin/second'
  ];

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
