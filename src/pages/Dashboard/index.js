import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text } from "@chakra-ui/react";
import { makeSelectUserStatus } from "../../redux/slices/app/selector";
import { useGetAllBlogsQuery } from "../../redux/slices/posts/api";
import { saveBlogsData } from "../../redux/slices/posts";
import { makeSelectBlogsData } from "../../redux/slices/posts/selector";
import Layout from "../../components/Layout/MainLayout";
import useCustomToast from "../../components/CustomToast";
import BlogList from "../../components/BlogPosts";
import Carousel from "../../components/Carousel";
import NotificationBanner from "../../components/NotificationBanner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const blogsData = useSelector(makeSelectBlogsData());
  const userStatus = useSelector(makeSelectUserStatus());
  const { data, isLoading, isError, refetch } = useGetAllBlogsQuery(undefined, {
    skip: userStatus !== "approved",
  });

  useEffect(() => {
    if (userStatus === "approved") {
      if (!isLoading && !isError && data) {
        dispatch(saveBlogsData(data?.data));
      } else if (isError) {
        toast({
          title: "Dashboard",
          description: "Error getting blogs list",
          status: "error",
        });
      }
    }
  }, [data, isLoading, isError, userStatus, dispatch, toast]);

  useEffect(() => {
    if (userStatus === "approved") {
      refetch();
    }
  }, [userStatus, refetch]);

  const priorityBlogs = blogsData.filter((blog) => blog.type === "priority");

  const slides = priorityBlogs.map((blog) => ({
    url: blog.url,
    id: blog.id,
  }));

  if (userStatus !== "approved") {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize="xl" color="gray.600">
            No data found
          </Text>
        </Box>
      </Layout>
    );
  }
  return (
    <Layout isLoading={isLoading}>
      <NotificationBanner />
      {slides.length > 0 && <Carousel slides={slides} />}
      <BlogList blogs={blogsData} />
    </Layout>
  );
};
export default Dashboard;
