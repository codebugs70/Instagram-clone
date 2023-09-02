import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    postData: {},
    cmtData: {},
    isUpdateCmt: false,
  },
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
    setCmtData: (state, action) => {
      state.cmtData = action.payload;
    },
    setIsUpdateCmt: (state, action) => {
      state.isUpdateCmt = action.payload;
    },
  },
});

export const { setPostData, setCmtData, setIsUpdateCmt } = postSlice.actions;
export default postSlice.reducer;
