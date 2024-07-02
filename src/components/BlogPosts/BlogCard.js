import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Tag,
  Button,
  Flex,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { categoryMap } from "../../utils/constants";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const category = categoryMap[blog.category] || {
    label: blog.category,
    colorScheme: "gray",
  };

  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  return (
    <Box
      maxW="sm"
      w="100%"
      bg="white"
      p="6"
      borderRadius="15px"
      boxShadow="md"
      overflow="hidden"
      position="relative"
    >
      <Box
        height="250px"
        width="100%"
        overflow="hidden"
        borderRadius="xl"
        mb="4"
      >
        <Image
          src={blog?.url}
          alt={blog?.title}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <HStack mb="2">
        <Tag variant="solid" colorScheme={category.colorScheme}>
          {category.label}
        </Tag>
      </HStack>
      <VStack spacing="2" alignItems="flex-start" mb="2">
        <Heading fontSize="xl">{blog?.title}</Heading>
        <Text fontSize="sm">{blog?.description}</Text>
      </VStack>

      <Flex justifyContent="space-between" alignItems="center" mt="auto">
        <VStack align="start" spacing="1">
          <HStack spacing="1" wrap="wrap">
            <Text
              fontSize={{ base: "xs", md: "sm", lg: "sm" }}
              color="gray.500"
            >
              By
            </Text>
            <Text
              fontSize={{ base: "xs", md: "sm", lg: "sm" }}
              color="#27374d"
              fontWeight="600"
            >
              Admin
            </Text>
            <Text
              fontSize={{ base: "xs", md: "sm", lg: "sm" }}
              color="gray.500"
            >
              • {timeAgo}
            </Text>
          </HStack>
          <Text fontSize={{ base: "xs", md: "sm", lg: "sm" }} color="gray.500">
            {blog?.views} views
          </Text>
        </VStack>
        <Spacer />
        <Button
          size={{ base: "xs", md: "sm", lg: "sm" }}
          colorScheme="blue"
          onClick={() => navigate(`/post/${blog?.id}`)}
        >
          Read More
        </Button>
      </Flex>
    </Box>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    views: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default BlogCard;
