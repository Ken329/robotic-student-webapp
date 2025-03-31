import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAchievementsData } from "../../../redux/slices/achievements";
import { makeSelectToken } from "../../../redux/slices/app/selector";
import { makeSelectAchievementsData } from "../../../redux/slices/achievements/selector";
import { useGetAchievementsQuery } from "../../../redux/slices/achievements/api";
import { getAchievementImage } from "../../../services/helper";
import useCustomToast from "../../../components/CustomToast";

const useAchievements = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const token = useSelector(makeSelectToken());
  const achievements = useSelector(makeSelectAchievementsData());
  const { data, isLoading, isError } = useGetAchievementsQuery();
  const [imagesLoading, setImagesLoading] = useState(true);

  const fetchImages = async (achievements) => {
    setImagesLoading(true);
    const updatedAchievements = await Promise.all(
      achievements?.map(async (achievement) => {
        const imageUrl = achievement?.achievementImageUrl;
        try {
          const imageBlob = await getAchievementImage(imageUrl, token);
          const imageObjectURL = URL.createObjectURL(imageBlob);
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
    dispatch(saveAchievementsData(updatedAchievements));
    setImagesLoading(false);
  };

  useEffect(() => {
    if (!isLoading && !isError && data?.data) {
      fetchImages(data?.data);
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
  }, [data, isLoading, isError]);

  const groupByYear = (achievements) => {
    return achievements.reduce((acc, achievement) => {
      const year = new Date(achievement.achievementCreationDate).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(achievement);
      return acc;
    }, {});
  };

  return {
    achievements,
    isLoading,
    imagesLoading,
    groupedAchievements: groupByYear(achievements),
    sortedYears: Object.keys(groupByYear(achievements)).sort((a, b) => b - a),
  };
};

export default useAchievements;
