import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaMedal } from "react-icons/fa";
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
        <Flex
          alignItems="center"
          justifyContent="center"
          direction="column"
          bg="orange.100"
          p={4}
          borderRadius="md"
          boxShadow="md"
          my={4}
        >
          <Icon as={FaMedal} boxSize={12} color="orange.500" mb={2} />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="orange.700"
            textAlign="center"
            mb={1}
          >
            No Data Found!
          </Text>
        </Flex>
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
