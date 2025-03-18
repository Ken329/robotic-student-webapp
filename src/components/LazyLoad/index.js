import React, { Suspense } from "react";
import { Center, Spinner } from "@chakra-ui/react";

const LazyLoad = (Component) => (
  <Suspense
    fallback={
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Center>
    }
  >
    <Component />
  </Suspense>
);

export default LazyLoad;
