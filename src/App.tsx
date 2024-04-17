import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/login"
import { page_routes } from "./utils/page_routes"
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientOptions } from "./utils/constant";
import UserProvider from "./contexts/userProvider";
import AxiosProvider from "./contexts/axiosProvider";
import PageLoader from "./components/PageLoader";
import PersistLayout from "./layouts/persist/persistLayout";
import CriminalsPage from "./pages/criminals/list";
import CriminalsDetailPage from "./pages/criminals/detail";
const AuthLayout = lazy(()=>import("./layouts/auth"));
const ProtectedLayout = lazy(()=>import("./layouts/protected/protectedLayout"));
const GuestLayout = lazy(()=>import("./layouts/guest/guestLayout"));
const DashboardLayout = lazy(()=>import("./layouts/dashboard"));
const ForgotPasswordPage = lazy(()=>import("./pages/auth/forgot_password"));
const ResetPasswordPage = lazy(()=>import("./pages/auth/reset_password"));
const DashboardPage = lazy(()=>import("./pages/dashboard"));
const PageNotFound = lazy(()=>import("./pages/pageNotFound"));
const UsersPage = lazy(()=>import("./pages/users"));

// Create a client
const queryClient = new QueryClient(QueryClientOptions);

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter basename={page_routes.dashboard}>
          <AxiosProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route element={<PersistLayout />}>
                  <Route element={<ProtectedLayout />}>
                    <Route element={<DashboardLayout />}>
                      <Route path={page_routes.dashboard} element={<DashboardPage />} />
                      <Route path={page_routes.users} element={<UsersPage />} />
                      <Route path={page_routes.criminals.list} element={<CriminalsPage />} />
                      <Route path={page_routes.criminals.detail} element={<CriminalsDetailPage />} />
                    </Route>
                  </Route>

                  <Route element={<GuestLayout />}>
                    <Route element={<AuthLayout />}>
                      <Route path={page_routes.auth.login} element={<LoginPage />} /> {/* 👈 Renders Login Screen at /login */}
                      <Route path={page_routes.auth.forgot_password} element={<ForgotPasswordPage />} /> {/* 👈 Renders Login Screen at /login */}
                      <Route path={page_routes.auth.reset_password} element={<ResetPasswordPage />} /> {/* 👈 Renders Login Screen at /login */}
                    </Route>
                  </Route>
                </Route>
                
                <Route element={<Suspense fallback={<PageLoader />}>
                    <Outlet />  
                  </Suspense>}>
                  <Route path="*" element={<PageNotFound />} /> {/* 👈 Renders Page Not Found Screen */}
                </Route>
              </Routes>
            </QueryClientProvider>
          </AxiosProvider>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
