import { useState, useMemo } from "react";
import { sortBlogs } from "../../../utils/helper";

const useBlogFilters = (blogs) => {
  const [filters, setFilters] = useState({
    category: "all",
    sort: "newest",
    searchQuery: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearchChange = (event) => {
    updateFilter("searchQuery", event.target.value);
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        filters.category === "all" || blog.category === filters.category;
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, filters.category, filters.searchQuery]);

  const sortedAndFilteredBlogs = useMemo(
    () => sortBlogs(filteredBlogs, filters.sort),
    [filteredBlogs, filters.sort]
  );

  return {
    filters,
    updateFilter,
    handleSearchChange,
    sortedAndFilteredBlogs,
  };
};

export default useBlogFilters;
