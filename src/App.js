import React, { lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import LazyLoad from "./components/LazyLoad";
import AuthLayout from "./components/Layout/AuthLayout";
import PrivateRoute from "./components/PrivateRoute";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Verify = lazy(() => import("./pages/Verify"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Post = lazy(() => import("./pages/Post"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Competitions = lazy(() => import("./pages/Competitions"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout />}>
        <Route index element={LazyLoad(IndexPage)} />
        <Route path="login" element={LazyLoad(LoginPage)} />
        <Route path="sign-up" element={LazyLoad(SignUpPage)} />
        <Route path="forgot-password" element={LazyLoad(ForgotPassword)} />
        <Route path="verify" element={LazyLoad(Verify)} />
        <Route path="logout" element={LazyLoad(LogoutPage)} />
        <Route path="maintenance" element={LazyLoad(Maintenance)} />
      </Route>

      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={LazyLoad(Dashboard)} />
        <Route path="post/:id" element={LazyLoad(Post)} />
        <Route path="profile" element={LazyLoad(Profile)} />
        <Route path="achievements" element={LazyLoad(Achievements)} />
        <Route path="competitions" element={LazyLoad(Competitions)} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
