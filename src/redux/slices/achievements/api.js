import { baseApiSlice } from "@redux/createAppApi";
import { withCacheSettings } from "@utils/helper";

export const achievementsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAchievements: builder.query(
        withCacheSettings({
          query: () => ({
            url: "/achievements",
          }),
        })
      ),
    };
  },
});

export const { useGetAchievementsQuery } = achievementsApi;
