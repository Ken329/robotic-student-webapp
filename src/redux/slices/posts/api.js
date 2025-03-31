import { withCacheSettings } from "../../../utils/helper";
import { baseApiSlice } from "../../createAppApi";

export const postsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPostById: builder.query(
        withCacheSettings({
          query: (id) => ({
            url: `/blog/${id}`,
          }),
        })
      ),
      getAllBlogs: builder.query(
        withCacheSettings({
          query: () => ({
            url: "/blog",
          }),
        })
      ),
      signUpConfirmation: builder.query(
        withCacheSettings({
          query: (blogId) => ({
            url: `/participants/${blogId}`,
          }),
        })
      ),
      getAllSignUps: builder.query(
        withCacheSettings({
          query: () => ({
            url: "/participants",
          }),
        })
      ),
      getAllStudents: builder.query(
        withCacheSettings({
          query: () => ({
            url: "/user/students",
          }),
        })
      ),
      competitionSignUp: builder.mutation({
        query: ({ blogId, payload }) => ({
          url: `/participants/${blogId}`,
          method: "POST",
          body: {
            attributes: payload.attributes,
          },
        }),
      }),
    };
  },
});

export const {
  useGetPostByIdQuery,
  useGetAllBlogsQuery,
  useSignUpConfirmationQuery,
  useGetAllSignUpsQuery,
  useGetAllStudentsQuery,
  useCompetitionSignUpMutation,
} = postsApi;
