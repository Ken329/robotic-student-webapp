import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectUserName } from "../../../redux/slices/app/selector";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";

const MobileNav = ({ onOpen, onLogout, onClickProfile, ...props }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(null);
  const userName = useSelector(makeSelectUserName());

  useEffect(() => {
    let currentLocation = location?.pathname;
    if (currentLocation === "/dashboard") {
      setCurrentPage("Dashboard");
    } else if (currentLocation === "/test") {
      setCurrentPage("Test");
    } else if (currentLocation === "/profile") {
      setCurrentPage("Profile");
    } else if (currentLocation === "/achievements") {
      setCurrentPage("Achievements");
    } else if (currentLocation === "/competitions") {
      setCurrentPage("Competitions");
    } else {
      setCurrentPage("");
    }
  }, [location]);

  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="3.75rem"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...props}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex
        display={{ base: "flex", md: "none" }}
        flex="1"
        justifyContent="center"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        <Text fontSize="2xl" fontWeight="bold" color="#27374d">
          {currentPage}
        </Text>
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userName}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={onClickProfile}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={onLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClickProfile: PropTypes.func.isRequired,
};

export default MobileNav;
