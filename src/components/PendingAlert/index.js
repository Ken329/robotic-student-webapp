import React from "react";
import { useSelector } from "react-redux";
import { makeSelectUserStatus } from "../../redux/slices/app/selector";
import {
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { PENDING_STATUS_MAP } from "../../utils/constants";

const PendingAlert = () => {
  const status = useSelector(makeSelectUserStatus());

  const isPending = Object.values(PENDING_STATUS_MAP).includes(status);
  const isExpired = status === "expired";

  if (!isPending && !isExpired) return null;

  const alertProps = isPending
    ? {
        status: "warning",
        title: `Your account is ${status} approval!`,
        description:
          "Access to some features may be limited. Thank you for your patience.",
      }
    : {
        status: "error",
        title: "Your membership is pending renewal!",
        description:
          "Please contact your centre for renewal, then update your profile. Access to some features may be limited. Thank you for your patience.",
      };

  return (
    <Alert status={alertProps.status} marginBottom="8px">
      <AlertIcon />
      <Box>
        <AlertTitle>{alertProps.title}</AlertTitle>
        <AlertDescription>{alertProps.description}</AlertDescription>
      </Box>
    </Alert>
  );
};

export default PendingAlert;
