import { useEffect, useMemo, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { saveAchievementsData } from "@redux/slices/achievements";
import { useGetAchievementsQuery } from "@redux/slices/achievements/api";
import { selectAchievementsData } from "@redux/slices/achievements/selector";
import { selectToken } from "@redux/slices/app/selector";
import { getAchievementImage } from "@services/helper";
import { EMPTY_ARRAY } from "@utils/constants";
import useCustomToast from "@components/CustomToast";

const groupByYear = (achievements) =>
  achievements.reduce((acc, achievement) => {
    const year = new Date(achievement.achievementCreationDate).getFullYear();

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(achievement);

    return acc;
  }, {});

const useAchievements = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const token = useSelector(selectToken);
  const storedAchievements = useSelector(selectAchievementsData);
  const achievements = storedAchievements ?? EMPTY_ARRAY;
  const { data, isLoading, isError } = useGetAchievementsQuery();
  const [imagesLoading, setImagesLoading] = useState(true);
  const objectUrlsRef = useRef([]);

  // Revoke the blob URLs when the page unmounts.
  useEffect(() => {
    const urls = objectUrlsRef;

    return () => urls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  useEffect(() => {
    let isStale = false;

    const fetchImages = async (items) => {
      setImagesLoading(true);

      const createdUrls = [];
      const updatedAchievements = await Promise.all(
        items.map(async (achievement) => {
          try {
            const imageBlob = await getAchievementImage(
              achievement?.achievementImageUrl,
              token
            );
            const imageObjectURL = URL.createObjectURL(imageBlob);

            createdUrls.push(imageObjectURL);

            return { ...achievement, imageUrl: imageObjectURL };
          } catch (error) {
            toast({
              title: "Achievements",
              description: `Error fetching image: ${error}`,
              status: "error",
            });

            return achievement;
          }
        })
      );

      if (isStale) {
        createdUrls.forEach((url) => URL.revokeObjectURL(url));

        return;
      }

      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = createdUrls;
      dispatch(saveAchievementsData(updatedAchievements));
      setImagesLoading(false);
    };

    if (!isLoading && !isError && data?.data) {
      fetchImages(data.data);
    } else if (!isLoading && !isError && data) {
      dispatch(saveAchievementsData(null));
      setImagesLoading(false);
    } else if (isError) {
      toast({
        title: "Achievements",
        description: "Error getting achievements",
        status: "error",
      });
      setImagesLoading(false);
    }

    return () => {
      isStale = true;
    };
    // `token` is intentionally omitted: a token refresh must not refetch every image.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError, dispatch, toast]);

  const groupedAchievements = useMemo(
    () => groupByYear(achievements),
    [achievements]
  );
  const sortedYears = useMemo(
    () => Object.keys(groupedAchievements).sort((a, b) => b - a),
    [groupedAchievements]
  );

  return {
    achievements,
    isLoading,
    imagesLoading,
    groupedAchievements,
    sortedYears,
  };
};

export default useAchievements;
