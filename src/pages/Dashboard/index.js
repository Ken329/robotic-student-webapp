import React from "react";

import { Box, Text } from "@chakra-ui/react";

import useFetchBlogs from "@pages/Dashboard/hooks/useFetchBlogs";
import BlogList from "@components/BlogPosts";
import Carousel from "@components/Carousel";
import PageContent from "@components/Layout/MainLayout/PageContent";
import NotificationBanner from "@components/NotificationBanner";

const Dashboard = () => {
  const { blogsData, slides, userStatus, isLoading, isUserPending } =
    useFetchBlogs();

  if (!userStatus) {
    return <PageContent isLoading={!userStatus} padding={0}></PageContent>;
  }

  if (isUserPending) {
    return (
      <PageContent padding={0}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize="xl" color="gray.600">
            Posts are available for approved accounts only
          </Text>
        </Box>
      </PageContent>
    );
  }

  return (
    <PageContent isLoading={isLoading} padding={0}>
      <NotificationBanner />
      {slides.length > 0 && <Carousel slides={slides} />}
      <BlogList blogs={blogsData} />
    </PageContent>
  );
};

export default Dashboard;
