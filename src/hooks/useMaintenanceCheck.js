import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMaintenanceCheckQuery } from "../redux/slices/app/api";

const useMaintenanceCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [maintenanceTime, setMaintenanceTime] = useState({});
  const { data, isLoading, isError } = useMaintenanceCheckQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      setMaintenanceTime(data?.data);
      if (data?.data !== null) {
        navigate("/maintenance");
      } else {
        if (location.pathname === "/maintenance") {
          navigate("/login");
        }
      }
    }
  }, [data, isLoading, isError, navigate, location]);

  return { maintenanceTime };
};

export default useMaintenanceCheck;
