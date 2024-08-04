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
      competitionSignUp: builder.mutation({
        query: (blogId) => ({
          url: `/participants/${blogId}`,
          method: "POST",
        }),
      }),
      signUpConfirmation: builder.query({
        query: (blogId) => ({
          url: `/participants/${blogId}`,
        }),
      }),
      getAllSignUps: builder.query({
        query: () => ({
          url: "/participants",
        }),
      }),
    };
  },
});

export const {
  useGetPostByIdQuery,
  useGetAllBlogsQuery,
  useCompetitionSignUpMutation,
  useSignUpConfirmationQuery,
  useGetAllSignUpsQuery,
} = postsApi;
