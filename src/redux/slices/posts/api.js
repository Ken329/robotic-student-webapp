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
        query: ({ blogId, payload }) => ({
          url: `/participants/${blogId}`,
          method: "POST",
          body: {
            attributes: payload.attributes,
          },
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
      getAllStudents: builder.query({
        query: () => ({
          url: "/user/students",
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
  useGetAllStudentsQuery,
} = postsApi;
