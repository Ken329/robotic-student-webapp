import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaMedal } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import BlogCard from "./BlogCard";
import { sortBlogs } from "../../utils/helper";

const BlogList = ({ blogs }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedAndFilteredBlogs = sortBlogs(filteredBlogs, sortBy);

  return (
    <Box m={{ base: "5%", md: "5%", lg: "2%" }}>
      <Flex
        direction={{ base: "column", md: "row", lg: "row" }}
        alignItems={{ base: "stretch", md: "center", lg: "center" }}
        mb={4}
        gap={4}
      >
        <InputGroup flex="1" bg="white" borderRadius="md" boxShadow="sm">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            bg="white"
            border="none"
            _focus={{ boxShadow: "outline" }}
          />
        </InputGroup>
        <Flex direction={{ base: "rown", md: 0, lg: 0 }} gap={4}>
          <Select
            onChange={handleCategoryChange}
            bg="white"
            flex="1"
            borderRadius="md"
            boxShadow="sm"
            _focus={{ boxShadow: "outline" }}
          >
            <option value="all">All</option>
            {[...new Set(blogs.map((blog) => blog.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </Select>
          <Select
            onChange={handleSortChange}
            bg="white"
            flex="1"
            borderRadius="md"
            boxShadow="sm"
            _focus={{ boxShadow: "outline" }}
            value={sortBy}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostViewed">Most Viewed</option>
          </Select>
        </Flex>
      </Flex>
      <Heading as="h3" size="lg" mb="10px">
        Latest Posts
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={5}>
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
            No Data Found!
          </Text>
        </Flex>
      )}
    </Box>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

BlogList.defaultProps = {
  blogs: [],
};

export default BlogList;
