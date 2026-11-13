import React, { useEffect, useState } from "react";

import { Flex, Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { saveToken } from "@redux/slices/app";
import userpool from "@utils/userpool";
import Layout from "@components/Layout/MainLayout";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = userpool.getCurrentUser();
    const authTokens = JSON.parse(localStorage.getItem("token"));

    if (user && authTokens?.accessToken) {
      dispatch(saveToken(authTokens.accessToken));
      setIsReady(true);
    } else {
      navigate("/logout", { replace: true });
    }
  }, [dispatch, navigate]);

  // The shell stays mounted across route changes; only the Outlet swaps.
  return (
    <Layout>
      {isReady ? (
        <Outlet />
      ) : (
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="10"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
        </Flex>
      )}
    </Layout>
  );
};
export default PrivateRoute;
