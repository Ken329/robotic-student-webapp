import React from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import AnimatedPage from "@components/AnimatedPage";
import PendingAlert from "@components/PendingAlert";
import Spin from "@components/Spin";

// Per-page content area. Rendered inside the persistent shell (MainLayout),
// so only this part remounts on route changes.
const PageContent = ({ children, isLoading = false, padding = 4 }) => (
  <Box p={padding}>
    {isLoading ? (
      <Spin />
    ) : (
      <AnimatedPage>
        <PendingAlert />
        {children}
      </AnimatedPage>
    )}
  </Box>
);

PageContent.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  padding: PropTypes.number,
};

export default PageContent;
