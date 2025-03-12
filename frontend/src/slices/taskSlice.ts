import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksByTeacher, deleteTask } from "../services/taskService";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (teacherId: string) => {
    const response = await getTasksByTeacher(teacherId);
    return response;
  }
);

// Async thunk to delete a task
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (taskId: string, { dispatch }) => {
    await deleteTask(taskId);
    dispatch(deleteTaskFromState(taskId));
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteTaskFromState: (state, action) => {
      state.data = state.data.filter((task: any) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        
      });
  },
});

export const { deleteTaskFromState } = taskSlice.actions;
export default taskSlice.reducer;
