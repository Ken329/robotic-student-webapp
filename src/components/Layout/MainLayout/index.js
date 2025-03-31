import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "./SideBarContent";
import MobileNav from "./MobileNavItem";
import PendingAlert from "../../PendingAlert";
import AnimatedPage from "../../AnimatedPage";
import Spin from "../../Spin";
import useLayout from "./hooks/useLayout";

const Layout = ({ children, isLoading = false, padding = 4 }) => {
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
      <Box ml={{ base: 0, md: 60 }} p={padding}>
        {isLoading || isUserLoading ? (
          <Spin />
        ) : (
          <AnimatedPage>
            <PendingAlert />
            {children}
          </AnimatedPage>
        )}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  padding: PropTypes.number,
};

export default Layout;
