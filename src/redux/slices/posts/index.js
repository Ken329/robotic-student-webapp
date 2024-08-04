import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  files: [],
  competitions: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    saveBlogsData(state, action) {
      state.blogs = action.payload;
    },
    saveFilesData(state, action) {
      state.files = action.payload;
    },
    saveCompetitionsData(state, action) {
      state.competitions = action.payload;
    },
  },
});

export const { saveBlogsData, saveFilesData, saveCompetitionsData } =
  postsSlice.actions;
export default postsSlice.reducer;
