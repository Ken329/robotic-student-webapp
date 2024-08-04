export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatIssuedAtDate = (issuedAt) => {
  const date = new Date(issuedAt);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const sortBlogs = (blogs, sortBy) => {
  const sortedBlogs = [...blogs];
  switch (sortBy) {
    case "newest":
      return sortedBlogs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case "oldest":
      return sortedBlogs.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    case "mostViewed":
      return sortedBlogs.sort((a, b) => b.views - a.views);
    default:
      return sortedBlogs;
  }
};
