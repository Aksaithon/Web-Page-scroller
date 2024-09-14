import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./features/addUserData/userDataSlice";
import userPostReducer from "./features/addUserPosts/userPostSlice";
import reelsReducer from "./features/addReelPosts/reelPostSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userDataReducer,
      userPosts: userPostReducer,
      allReels: reelsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];