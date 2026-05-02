import React, { useMemo, memo } from "react";
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
  Box,
  Badge,
} from "@chakra-ui/react";
import { CATEGORY_MAP } from "../../utils/constants";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const category = useMemo(
    () =>
      CATEGORY_MAP[blog.category] || {
        label: blog.category,
        colorScheme: "gray",
      },
    [blog.category],
  );

  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  const extractDueDate = (description) => {
    const match = description?.match(/due_date=(\d{2}\/\d{2}\/\d{4})/);

    if (!match) return null;

    const [day, month, year] = match[1].split("/").map(Number);

    const dueDate = new Date(year, month - 1, day);

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const isExpired = dueDate < today;

    return {
      label: isExpired ? "Expired" : `Due Date ${match[1]}`,
      colorScheme: isExpired ? "red" : "yellow",
    };
  };

  const dueDateInfo = extractDueDate(blog?.description);

  const normalizedDesc = (description) => {
    let desc = "";

    try {
      desc = description.replace(/\s*due_date=\d{2}\/\d{2}\/\d{4}/, "");
    } catch (err) {
      desc = description;
    }

    return desc;
  };

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
      <Box
        position="absolute"
        top="10px"
        right="10px"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        gap="2"
      >
        {dueDateInfo && (
          <Badge variant="subtle" colorScheme={dueDateInfo.colorScheme}>
            {dueDateInfo.label}
          </Badge>
        )}
      </Box>
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
          <Text fontSize="sm">{normalizedDesc(blog?.description)}</Text>
        </VStack>
      </CardBody>

      <CardFooter p="15px" pt="0" m="0">
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <VStack align="start">
            <HStack>
              <Text
                fontSize={{ base: "xs", md: "sm", lg: "sm" }}
                color="gray.500"
              >
                By Admin • {timeAgo}
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

export default memo(BlogCard);
