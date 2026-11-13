import React, { useEffect } from "react";

import { useGetAllSignUpsQuery } from "@redux/slices/posts/api";
import { EMPTY_ARRAY } from "@utils/constants";
import CompetitionPosts from "@components/CompetitionPosts";
import useCustomToast from "@components/CustomToast";
import PageContent from "@components/Layout/MainLayout/PageContent";

const Competitions = () => {
  const toast = useCustomToast();
  const { data, isLoading, isError } = useGetAllSignUpsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const competitionsData = data?.data ?? EMPTY_ARRAY;

  useEffect(() => {
    if (isError) {
      toast({
        title: "Competitions",
        description: "Error getting competition list",
        status: "error",
      });
    }
  }, [isError, toast]);

  return (
    <PageContent isLoading={isLoading}>
      <CompetitionPosts blogs={competitionsData} />
    </PageContent>
  );
};
export default Competitions;
