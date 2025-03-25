import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout/MainLayout";
import BlogList from "../../components/BlogPosts";
import Carousel from "../../components/Carousel";
import NotificationBanner from "../../components/NotificationBanner";
import useFetchBlogs from "./hooks/useFetchBlogs";

const Dashboard = () => {
  const { blogsData, slides, userStatus, isLoading, isUserPending } =
    useFetchBlogs();

  if (!userStatus) {
    return <Layout isLoading={!userStatus} padding={0}></Layout>;
  }

  if (isUserPending) {
    return (
      <Layout padding={0}>
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
      </Layout>
    );
  }

  return (
    <Layout isLoading={isLoading} padding={0}>
      <NotificationBanner />
      {slides.length > 0 && <Carousel slides={slides} />}
      <BlogList blogs={blogsData} />
    </Layout>
  );
};

export default Dashboard;
