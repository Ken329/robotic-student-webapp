import React, { Fragment } from "react";
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

  return (
    <Fragment>
      {isPending ? (
        <Alert status="warning" marginBottom={"8px"}>
          <AlertIcon />
          <Box>
            <AlertTitle>Your account is {status} approval!</AlertTitle>
            <AlertDescription>
              Access to some features may be limited. Thank you for your
              patience.
            </AlertDescription>
          </Box>
        </Alert>
      ) : isExpired ? (
        <Alert status="warning" marginBottom={"8px"}>
          <AlertIcon />
          <Box>
            <AlertTitle>Your membership is pending renewal!</AlertTitle>
            <AlertDescription>
              Please contact your centre for renewal, then go to profile to
              update your personal information. In the meantime access to some
              features may be limited. Thank you for your patience.
            </AlertDescription>
          </Box>
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default PendingAlert;
