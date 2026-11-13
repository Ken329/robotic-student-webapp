import React from "react";

import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

import useLayout from "@components/Layout/MainLayout/hooks/useLayout";
import MobileNav from "@components/Layout/MainLayout/MobileNavItem";
import SidebarContent from "@components/Layout/MainLayout/SideBarContent";
import Spin from "@components/Spin";

// Persistent app shell (sidebar + header). Route pages render via <Outlet />.
const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading: isUserLoading, onClickProfile, onLogout } = useLayout();

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        onLogout={onLogout}
        onClickProfile={onClickProfile}
      />
      <Box ml={{ base: 0, md: 60 }}>
        {isUserLoading ? <Spin /> : (children ?? <Outlet />)}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
