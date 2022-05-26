import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";
import userReducer from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userReducer,
  },
});
