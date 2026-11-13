import React from "react";

import { Box, CloseButton, Flex, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FiCompass, FiHome, FiStar } from "react-icons/fi";

import SteamCupPlusWord from "@assets/images/STEAM-Cup+-Text.png";
import useLayout from "@components/Layout/MainLayout/hooks/useLayout";
import NavItem from "@components/Layout/MainLayout/NavItem";

const SidebarContent = ({ onClose, ...props }) => {
  const { userStatus } = useLayout();

  const LinkItems = [
    { name: "Dashboard", icon: FiHome, path: "/dashboard", isDisabled: false },
    {
      name: "Achievements",
      icon: FiStar,
      path: "/achievements",
      isDisabled: userStatus !== "approved",
    },
    {
      name: "Competitions",
      icon: FiCompass,
      path: "/competitions",
      isDisabled: userStatus !== "approved",
    },
  ];

  return (
    <Box
      transition="3s ease"
      bg="#dde6ed"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={SteamCupPlusWord}
          alt="SteamCup Logo"
          maxH={{
            base: "40px",
            md: "80px",
            lg: "80px",
          }}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.path}
          icon={link.icon}
          path={link.path}
          isDisabled={link.isDisabled}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SidebarContent;
