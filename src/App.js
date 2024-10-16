import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import Verify from "./pages/Verify";
import Maintenance from "./pages/Maintenance";
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./components/Layout/AuthLayout";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Achievements from "./pages/Achievements";
import Competitions from "./pages/Competitions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify" element={<Verify />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>

      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route exact path="post/:id" element={<Post />} />
        <Route path="profile" element={<Profile />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="competitions" element={<Competitions />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
