import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import taskReducer from '../slices/taskSlice';
import studentReducer from '../slices/studentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    students: studentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
