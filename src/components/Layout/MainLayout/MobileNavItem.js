import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectUserName } from "../../../redux/slices/app/selector";
import {
  Box,
  Flex,
  Text,
  HStack,
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
  const userName = useSelector(makeSelectUserName());
  const storedUserName = localStorage.getItem("userName");

  useEffect(() => {
    if (userName && userName !== storedUserName) {
      localStorage.setItem("userName", userName);
    }
  }, [storedUserName, userName]);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/test": "Test",
    "/profile": "Profile",
    "/achievements": "Achievements",
    "/competitions": "Competitions",
  };

  const currentPage = pageTitles[location.pathname] || "";

  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="3.75rem"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
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
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size="sm"
                  name={storedUserName}
                  bg="orange.400"
                  color="white"
                  showBorder
                  borderColor="green.300"
                  borderWidth="3px"
                  _hover={{ transform: "scale(1.05)" }}
                />
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="white" borderColor="gray.200">
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
