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
import BlogCard from "../BlogPosts/BlogCard";
import { sortBlogs } from "../../utils/helper";

const CompetitionPosts = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
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
        My competitions
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
            You have not joined any competitions yet!
          </Text>
          <Text fontSize="md" color="orange.600" textAlign="center" px={2}>
            Look out for upcoming competitions or contact your centre for more
            info.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

CompetitionPosts.propTypes = {
  blogs: PropTypes.array.isRequired,
};

CompetitionPosts.defaultProps = {
  blogs: [],
};

export default CompetitionPosts;
