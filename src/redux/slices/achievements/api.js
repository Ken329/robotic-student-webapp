import { withCacheSettings } from "../../../utils/helper";
import { baseApiSlice } from "../../createAppApi";

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
