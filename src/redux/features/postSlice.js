import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
  },
  reducers: {},
});

export default postSlice.reducer;
