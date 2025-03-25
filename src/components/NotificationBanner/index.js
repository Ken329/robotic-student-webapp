import React from "react";
import { Box, Text, keyframes } from "@chakra-ui/react";

const scrollAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const NotificationBanner = () => {
  return (
    <Box
      position="relative"
      w="100%"
      h={{ base: "35px", lg: "50px" }}
      bg="blue.400"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Text
        as="span"
        whiteSpace="nowrap"
        color="white"
        fontWeight="bold"
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        animation={`${scrollAnimation} 30s linear infinite`}
        willChange="transform"
        aria-live="polite"
      >
        🎉 Welcome to STEAM Cup+ Student Portal! We have daily scheduled
        maintenance from 12 AM to 8 AM.
      </Text>
    </Box>
  );
};

export default NotificationBanner;
