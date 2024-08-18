import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  Image,
  Heading,
  Text,
  HStack,
  Tag,
  Button,
  Flex,
  VStack,
  Spacer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
    <Card
      maxW="sm"
      w="100%"
      bg="white"
      borderRadius="15px"
      boxShadow="md"
      overflow="hidden"
      position="relative"
    >
      <CardHeader p={0}>
        <Image
          src={blog?.url}
          alt={blog?.title}
          objectFit="cover"
          width="100%"
          height="250px"
          borderTopRadius="15px"
        />
      </CardHeader>

      <CardBody p="15px" m="0">
        <HStack pb={"10px"}>
          <Tag variant="solid" colorScheme={category.colorScheme}>
            {category.label}
          </Tag>
        </HStack>
        <VStack alignItems="flex-start">
          <Heading fontSize="xl">{blog?.title}</Heading>
          <Text fontSize="sm">{blog?.description}</Text>
        </VStack>
      </CardBody>

      <CardFooter p="15px" pt="0" m="0">
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <VStack align="start">
            <HStack wrap="wrap">
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
            <Text
              fontSize={{ base: "xs", md: "sm", lg: "sm" }}
              color="gray.500"
            >
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
      </CardFooter>
    </Card>
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
