import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    postData: {},
    cmtData: {},
  },
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
    setCmtData: (state, action) => {
      state.cmtData = action.payload;
    },
  },
});

export const { setPostData, setCmtData } = postSlice.actions;
export default postSlice.reducer;
