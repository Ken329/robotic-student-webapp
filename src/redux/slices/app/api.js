import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUserData: builder.query({
        query: () => ({
          url: "/user",
        }),
      }),
      maintenanceCheck: builder.query({
        query: () => ({
          url: "/maintenance",
        }),
      }),
      renewStudentAccount: builder.mutation({
        query: ({ payload }) => ({
          url: `/user/renewsss`,
          method: "POST",
          body: {
            ...payload,
          },
        }),
      }),
    };
  },
});

export const {
  useGetUserDataQuery,
  useMaintenanceCheckQuery,
  useRenewStudentAccountMutation,
} = appApi;
