import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelectUserName,
  makeSelectUserStatus,
} from "../../../../redux/slices/app/selector";
import { useGetUserDataQuery } from "../../../../redux/slices/app/api";
import { saveUserData } from "../../../../redux/slices/app";
import userpool from "../../../../utils/userpool";

const useLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, isLoading, isError } = useGetUserDataQuery();

  const userName = useSelector(makeSelectUserName());
  const userStatus = useSelector(makeSelectUserStatus());
  const storedUserName = localStorage.getItem("userName");

  const onClickProfile = () => navigate("/profile");
  const onLogout = () => navigate("/logout");

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const role = data?.data?.role;
      if (role !== "student") {
        navigate("/logout", { replace: true, state: { unauthorized: true } });
      } else {
        if (data?.data?.status === "rejected") {
          const user = userpool.getCurrentUser();
          if (user) {
            user.getSession((err, session) => {
              if (!err && session) {
                user.deleteUser((deleteErr) => {
                  if (deleteErr) {
                    console.error("Error deleting user:", deleteErr);
                  } else {
                    console.log("Successfully deleted user");
                    navigate("/login", { replace: true });
                  }
                });
              }
            });
          }
        }
        dispatch(saveUserData(data?.data));
      }
    } else if (isError) {
      navigate("/logout");
    }
  }, [data, isLoading, isError, dispatch, navigate]);

  return {
    location,
    userName,
    storedUserName,
    userStatus,
    isLoading,
    onClickProfile,
    onLogout,
  };
};

export default useLayout;
