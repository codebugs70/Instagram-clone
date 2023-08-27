import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import postSlice from "./features/postSlice";

export const reducer = combineReducers({
  user: userSlice,
  post: postSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
