import {HashRouter, Outlet, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/login"
import { page_routes } from "./utils/page_routes"
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientOptions } from "./utils/constant";
import UserProvider from "./contexts/userProvider";
import AxiosProvider from "./contexts/axiosProvider";
import PageLoader from "./components/PageLoader";
import PersistLayout from "./layouts/persist/persistLayout";
const AuthLayout = lazy(()=>import("./layouts/auth"));
const ProtectedLayout = lazy(()=>import("./layouts/protected/protectedLayout"));
const GuestLayout = lazy(()=>import("./layouts/guest/guestLayout"));
const DashboardLayout = lazy(()=>import("./layouts/dashboard"));
const ForgotPasswordPage = lazy(()=>import("./pages/auth/forgot_password"));
const ResetPasswordPage = lazy(()=>import("./pages/auth/reset_password"));
const DashboardPage = lazy(()=>import("./pages/dashboard"));
const PageNotFound = lazy(()=>import("./pages/pageNotFound"));
const UsersPage = lazy(()=>import("./pages/users"));
const CriminalsPage = lazy(()=>import("./pages/criminals/list"));
const CriminalsDetailPage = lazy(()=>import("./pages/criminals/detail"));
const CrimesPage = lazy(()=>import("./pages/crimes/list"));
const CrimesDetailPage = lazy(()=>import("./pages/crimes/detail"));
const CourtsPage = lazy(()=>import("./pages/courts/list"));
const CourtsDetailPage = lazy(()=>import("./pages/courts/detail"));
const JailsPage = lazy(()=>import("./pages/jails/list"));
const JailsDetailPage = lazy(()=>import("./pages/jails/detail"));

// Create a client
const queryClient = new QueryClient(QueryClientOptions);

function App() {

  return (
    <>
      <UserProvider>
        <HashRouter basename={page_routes.dashboard}>
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
                      <Route path={page_routes.crimes.list} element={<CrimesPage />} />
                      <Route path={page_routes.crimes.detail} element={<CrimesDetailPage />} />
                      <Route path={page_routes.court_details.list} element={<CourtsPage />} />
                      <Route path={page_routes.court_details.detail} element={<CourtsDetailPage />} />
                      <Route path={page_routes.punishment.list} element={<JailsPage />} />
                      <Route path={page_routes.punishment.detail} element={<JailsDetailPage />} />
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
        </HashRouter>
      </UserProvider>
    </>
  )
}

export default App
