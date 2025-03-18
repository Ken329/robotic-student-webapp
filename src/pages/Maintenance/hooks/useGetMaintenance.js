import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaintenanceCheckQuery } from "../../../redux/slices/app/api";

const useGetMaintenance = () => {
  const navigate = useNavigate();
  const [maintenanceTime, setMaintenanceTime] = useState({});
  const {
    data: maintenanceData,
    isLoading: maintenanceIsLoading,
    isError: maintenanceIsError,
  } = useMaintenanceCheckQuery();

  useEffect(() => {
    if (
      !maintenanceIsLoading &&
      !maintenanceIsError &&
      maintenanceData?.data === null
    ) {
      navigate("/login");
    } else {
      setMaintenanceTime(maintenanceData?.data);
    }
  }, [maintenanceData, maintenanceIsLoading, maintenanceIsError, navigate]);

  return { maintenanceTime, maintenanceIsLoading, maintenanceIsError };
};

export default useGetMaintenance;
