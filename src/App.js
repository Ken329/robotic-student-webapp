import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import NotFound from "./pages/404";
import Profile from "./pages/Profile";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./components/Layout/AuthLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout />}>
        <Route exact path="/student" element={<IndexPage />} />
        <Route path="/student/login" element={<LoginPage />} />
        <Route path="/student/sign-up" element={<SignUpPage />} />
        <Route path="/student/forgot-password" element={<ForgotPassword />} />
        <Route path="/student/logout" element={<LogoutPage />} />
      </Route>

      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/student/dashboard" element={<NotFound />} />
        <Route path="/student/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
