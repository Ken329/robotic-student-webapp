import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  makeSelectUserData,
  makeSelectUserStatus,
} from "../../../redux/slices/app/selector";
import {
  useGetUserDataQuery,
  useRenewStudentAccountMutation,
} from "../../../redux/slices/app/api";
import useCustomToast from "../../../components/CustomToast";

const useProfile = () => {
  const userData = useSelector(makeSelectUserData());
  const status = useSelector(makeSelectUserStatus());
  const toast = useCustomToast();

  const [profileData, setProfileData] = useState({});
  const [renewStudentAccount] = useRenewStudentAccountMutation();
  const { refetch } = useGetUserDataQuery();

  const isExpired = useMemo(() => status === "expired", [status]);

  useEffect(() => {
    if (userData) setProfileData(userData);
  }, [userData]);

  const getValue = useCallback(
    (field) => profileData[field] || "-",
    [profileData]
  );

  const handleSave = async (updatedData) => {
    try {
      const response = await renewStudentAccount({
        payload: updatedData,
      }).unwrap();
      if (response?.success) {
        toast({
          title: "Profile",
          description: "Successfully updated",
          status: "success",
        });
        refetch();
      }
    } catch (error) {
      toast({
        title: "Profile",
        description: error?.data?.message || "Update failed",
        status: "error",
      });
    }
  };

  return { profileData, isExpired, getValue, handleSave };
};

export default useProfile;
