import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    postData: {},
  },
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
  },
});

export const { setPostData } = postSlice.actions;
export default postSlice.reducer;
