import { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";

import { selectUserStatus } from "@redux/slices/app/selector";
import { useGetAllBlogsQuery } from "@redux/slices/posts/api";
import { EMPTY_ARRAY } from "@utils/constants";
import useCustomToast from "@components/CustomToast";

const useFetchBlogs = () => {
  const toast = useCustomToast();
  const userStatus = useSelector(selectUserStatus);

  const isUserPending = userStatus && userStatus !== "approved";

  const { data, isLoading, isError } = useGetAllBlogsQuery(undefined, {
    skip: userStatus !== "approved",
    refetchOnMountOrArgChange: true,
  });
  const blogsData = data?.data ?? EMPTY_ARRAY;

  useEffect(() => {
    if (userStatus === "approved" && isError) {
      toast({
        title: "Dashboard",
        description: "Error getting blogs list",
        status: "error",
      });
    }
  }, [isError, userStatus, toast]);

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
