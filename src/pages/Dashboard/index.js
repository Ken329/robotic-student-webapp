import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { data, isLoading, isError, refetch } = useGetAllBlogsQuery();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(saveBlogsData(data?.data));
    } else if (isError) {
      toast({
        title: "Dashboard",
        description: "Error getting blogs list",
        status: "error",
      });
    }
  }, [data, isLoading, isError, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const priorityBlogs = blogsData.filter((blog) => blog.type === "priority");

  const slides = priorityBlogs.map((blog) => ({
    url: blog.url,
    id: blog.id,
  }));

  return (
    <Layout isLoading={isLoading}>
      <NotificationBanner />
      {slides.length > 0 && <Carousel slides={slides} />}
      <BlogList blogs={blogsData} />
    </Layout>
  );
};
export default Dashboard;
