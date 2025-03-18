import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllBlogsQuery } from "../../../redux/slices/posts/api";
import { saveBlogsData } from "../../../redux/slices/posts";
import { makeSelectBlogsData } from "../../../redux/slices/posts/selector";
import { makeSelectUserStatus } from "../../../redux/slices/app/selector";
import useCustomToast from "../../../components/CustomToast";

const useFetchBlogs = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const blogsData = useSelector(makeSelectBlogsData());
  const userStatus = useSelector(makeSelectUserStatus());

  const isUserPending = userStatus && userStatus !== "approved";

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

  const slides = useMemo(
    () =>
      blogsData
        .filter((blog) => blog.type === "priority")
        .map((blog) => ({
          url: blog.url,
          id: blog.id,
        })),
    [blogsData]
  );

  return { blogsData, slides, userStatus, isLoading, isUserPending };
};

export default useFetchBlogs;
