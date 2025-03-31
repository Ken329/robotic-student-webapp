import React from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Grid,
  useMediaQuery,
  Icon,
} from "@chakra-ui/react";
import { FaMedal } from "react-icons/fa";
import { formatIssuedAtDate } from "../../utils/helper";
import Layout from "../../components/Layout/MainLayout";
import useAchievements from "./hooks/useAchievements";

const Achievements = () => {
  const {
    achievements,
    isLoading,
    imagesLoading,
    groupedAchievements,
    sortedYears,
  } = useAchievements();
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Layout isLoading={isLoading || imagesLoading}>
      <Flex flexDirection={"column"}>
        <Box p={5}>
          {!isMobile && (
            <Heading as="h2" size="lg" mb="4">
              Achievements
            </Heading>
          )}
          {achievements?.length === 0 && (
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
                No Achievements Yet!
              </Text>
              <Text fontSize="md" color="orange.600" textAlign="center" px={2}>
                Keep exploring and learning. Your first achievement is just
                around the corner. 💪
              </Text>
            </Flex>
          )}
          {sortedYears.map((year) => (
            <Box key={year} mb={8}>
              <Heading as="h3" size="md" mb={4}>
                {year}
              </Heading>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(auto-fill, minmax(200px, 1fr))",
                  lg: "repeat(auto-fill, minmax(200px, 1fr))",
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
