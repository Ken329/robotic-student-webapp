import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaMedal } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import { BLOG_FILTERS } from "../../utils/constants";
import useBlogFilters from "./hooks/useBlogFilters";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs = [] }) => {
  const { filters, updateFilter, handleSearchChange, sortedAndFilteredBlogs } =
    useBlogFilters(blogs);

  const renderFilterButtons = (options, key) => (
    <>
      {options.map((option) => (
        <Button
          key={option}
          size={{ base: "sm", md: "md" }}
          bg={filters[key] === option ? "#27374d" : "transparent"}
          color={filters[key] === option ? "white" : "#27374d"}
          border="1px solid #27374d"
          _hover={{
            bg: "#1f2c3d",
            color: "white",
          }}
          onClick={() => updateFilter(key, option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </>
  );

  return (
    <Box m={{ base: "5%", md: "5%", lg: "2%" }}>
      <Flex direction="column" mb={4} gap={4}>
        <InputGroup bg="white" borderRadius="md" boxShadow="sm">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            bg="white"
            border="none"
            _focus={{ boxShadow: "outline" }}
          />
        </InputGroup>

        <Flex direction={{ base: "column", md: "row" }} gap={2} wrap="wrap">
          <Flex gap={2} wrap="wrap">
            {renderFilterButtons(BLOG_FILTERS.categories, "category")}
          </Flex>
          <Flex gap={2} wrap="wrap">
            {renderFilterButtons(BLOG_FILTERS.sortOptions, "sort")}
          </Flex>
        </Flex>
      </Flex>

      <Heading as="h3" size="lg" mb="10px">
        Latest Posts
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {sortedAndFilteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </SimpleGrid>

      {sortedAndFilteredBlogs.length === 0 && (
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
            No posts found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
