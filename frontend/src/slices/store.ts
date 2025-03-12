import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice"; // Import the task slice

const store = configureStore({
  reducer: {
    tasks: taskReducer, // Add tasks reducer to store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
