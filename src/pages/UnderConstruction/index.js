import React from "react";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import Layout from "../../components/Layout/MainLayout";
import { FaHardHat } from "react-icons/fa";

const PageUnderConstruction = () => {
  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.100"
        textAlign="center"
        p={4}
      >
        <VStack spacing={6}>
          <Icon as={FaHardHat} boxSize={20} color="orange.500" />
          <Text fontSize="4xl" fontWeight="bold" color="gray.800">
            Under Construction
          </Text>
          <Text fontSize="lg" color="gray.600" maxWidth="500px">
            This page is currently under construction. Please check back soon.
          </Text>
        </VStack>
      </Box>
    </Layout>
  );
};

export default PageUnderConstruction;
