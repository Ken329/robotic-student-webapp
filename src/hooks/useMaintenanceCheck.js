import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMaintenanceCheckQuery } from "../redux/slices/app/api";

const useMaintenanceCheck = () => {
  const navigate = useNavigate();
  const [maintenanceTime, setMaintenanceTime] = useState({});
  const { data, isLoading, isError } = useMaintenanceCheckQuery();

  useEffect(() => {
    if (!isLoading && !isError && data?.data !== null) {
      navigate("/maintenance");
    } else {
      setMaintenanceTime(data?.data);
    }
  }, [data, isLoading, isError, navigate]);

  return { maintenanceTime };
};

export default useMaintenanceCheck;
