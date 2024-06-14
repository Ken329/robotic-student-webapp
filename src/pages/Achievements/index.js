import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAchievementsData } from "../../redux/slices/achievements";
import { makeSelectToken } from "../../redux/slices/app/selector";
import { makeSelectAchievementsData } from "../../redux/slices/achievements/selector";
import { useGetAchievementsQuery } from "../../redux/slices/achievements/api";
import { getAchievementImage } from "../../services/helper";
import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Grid,
  useMediaQuery,
} from "@chakra-ui/react";
import { formatIssuedAtDate } from "../../utils/helper";
import Layout from "../../components/Layout/MainLayout";
import useCustomToast from "../../components/CustomToast";

const Achievements = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const token = useSelector(makeSelectToken());
  const achievements = useSelector(makeSelectAchievementsData());
  const { data, isLoading, isError } = useGetAchievementsQuery();
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const fetchImages = async (achievements) => {
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
  };

  useEffect(() => {
    if (!isLoading && !isError && data?.data) {
      fetchImages(data?.data);
    } else if (!isLoading && !isError && data) {
      dispatch(saveAchievementsData(null));
    } else if (isError) {
      toast({
        title: "Achievements",
        description: "Error getting achievements",
        status: "error",
      });
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

  const groupedAchievements = groupByYear(achievements);
  const sortedYears = Object.keys(groupedAchievements).sort((a, b) => b - a);

  return (
    <Layout isLoading={isLoading}>
      <Flex flexDirection={"column"}>
        <Box p={5}>
          {!isMobile && (
            <Heading as="h2" size="lg" mb="4">
              Achievements
            </Heading>
          )}
          {achievements?.length === 0 && (
            <Text fontSize="14px" fontWeight="500" alignSelf="center">
              You have no achievements yet, keep trying!
            </Text>
          )}
          {sortedYears.map((year) => (
            <Box key={year} mb={8}>
              <Heading as="h3" size="md" mb={4}>
                {year}
              </Heading>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)", // For mobile screens
                  md: "repeat(auto-fill, minmax(200px, 1fr))", // For medium screens
                  lg: "repeat(auto-fill, minmax(200px, 1fr))", // For large screens
                }}
                gap={6}
              >
                {groupedAchievements[year].map((achievement, index) => (
                  <Box
                    key={index}
                    p={{
                      base: 2,
                      md: 4,
                      lg: 5,
                    }}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    textAlign="center"
                    bg="white"
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.05)" }}
                    position="relative"
                    boxShadow="md"
                  >
                    {achievement?.imageUrl && (
                      <Box m="5px">
                        <Image
                          src={achievement?.imageUrl}
                          alt={achievement?.achievementTitle}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                        />
                      </Box>
                    )}
                    <Text
                      fontSize={{
                        base: "sm",
                        md: "lg",
                        lg: "lg",
                      }}
                      mb={2}
                      fontWeight="bold"
                    >
                      {achievement?.achievementTitle}
                    </Text>
                    <Text
                      fontSize={{
                        base: "xs",
                        md: "sm",
                        lg: "sm",
                      }}
                      mb={2}
                    >
                      {achievement?.achievementDescription}
                    </Text>
                    <Text
                      fontSize={{
                        base: "xs",
                        md: "sm",
                        lg: "sm",
                      }}
                      color="gray.500"
                    >
                      {formatIssuedAtDate(
                        achievement?.achievementCreationDate
                      ) || ""}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Achievements;
