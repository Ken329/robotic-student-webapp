import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectUserStatus } from "../../../redux/slices/app/selector";
import SteamCupPlusWord from "../../../assets/images/STEAM-Cup+-Text.png";
import {
  Box,
  Flex,
  CloseButton,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { FiHome, FiCompass, FiStar } from "react-icons/fi";
import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...props }) => {
  const userStatus = useSelector(makeSelectUserStatus());

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
      bg={"#dde6ed"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
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
            base: "60px",
            md: "80px",
            lg: "80px",
          }}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem
          key={index}
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
