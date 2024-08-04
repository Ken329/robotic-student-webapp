import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllSignUpsQuery } from "../../redux/slices/posts/api";
import { saveCompetitionsData } from "../../redux/slices/posts";
import { makeSelectCompetitionsData } from "../../redux/slices/posts/selector";
import Layout from "../../components/Layout/MainLayout";
import useCustomToast from "../../components/CustomToast";
import CompetitionPosts from "../../components/CompetitionPosts";

const Competitions = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const competitionsData = useSelector(makeSelectCompetitionsData());
  const { data, isLoading, isError, refetch } = useGetAllSignUpsQuery();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(saveCompetitionsData(data?.data));
    } else if (isError) {
      toast({
        title: "Competitions",
        description: "Error getting competition list",
        status: "error",
      });
    }
  }, [data, isLoading, isError, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout isLoading={isLoading}>
      <CompetitionPosts blogs={competitionsData} />
    </Layout>
  );
};
export default Competitions;
