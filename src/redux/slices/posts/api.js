import { baseApiSlice } from "../../createAppApi";

export const postsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPostById: builder.query({
        query: (id) => ({
          url: `/blog/${id}`,
        }),
      }),
      getAllBlogs: builder.query({
        query: () => ({
          url: "/blog",
        }),
      }),
    };
  },
});

export const { useGetPostByIdQuery, useGetAllBlogsQuery } = postsApi;
