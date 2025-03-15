import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createTask, 
  getTasksByTeacher, 
  deleteTask, 
  updateTask, 
  getTasksByStudent ,
  updateTaskStatus
} from '../services/taskService';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  studentRegistrationNumber?: string;
  studentId?: string;
  teacherId?: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};


export const fetchTasksByTeacher = createAsyncThunk('tasks/fetchTasksByTeacher', async (teacherId: string) => {
  console.log("Fetching tasks for teacher ID:", teacherId); 
  const tasks = await getTasksByTeacher(teacherId);
  console.log("Fetched tasks from API:", tasks); 
  return tasks;
});


export const fetchTasksByStudent = createAsyncThunk('tasks/fetchTasksByStudent', async (studentId: string) => {
  console.log("Fetching tasks for student ID:", studentId); 
  const response = await getTasksByStudent(studentId);
  console.log("Fetched student tasks from API:", response); 
  return response.tasks || response; 
});

export const createNewTask = createAsyncThunk('tasks/createNewTask', async (taskData: Task) => {
  const newTask = await createTask(taskData);
  return newTask;
});

export const deleteExistingTask = createAsyncThunk('tasks/deleteExistingTask', async (taskId: string) => {
  await deleteTask(taskId);
  return taskId;
});

export const updateExistingTask = createAsyncThunk('tasks/updateExistingTask', async (taskData: Task) => {
  const updatedTask = await updateTask(taskData._id, taskData);
  console.log("taskUpdatein slice", updatedTask);
  return updatedTask;
});

export const updateExistingTaskStatus = createAsyncThunk('tasks/updateExistingTaskStatus', async ({ taskId, status }: { taskId: string, status: string }) => {
  const updatedTaskStatus = await updateTaskStatus(taskId, status);
  console.log("Task status updated in slice", updatedTaskStatus);
  return updatedTaskStatus; // Ensure this contains the task object
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTasksByTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksByTeacher.fulfilled, (state, action) => {
        console.log("Tasks stored in Redux (Teacher):", action.payload); 
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      
      .addCase(fetchTasksByStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksByStudent.fulfilled, (state, action) => {
        console.log("Tasks stored in Redux (Student):", action.payload); 
        state.loading = false;
        state.tasks = action.payload || [];
      })
      .addCase(fetchTasksByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch student tasks';
      })

      
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      
      .addCase(deleteExistingTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }else {
          console.warn("Task update failed, no payload returned.");
        }
      })

      .addCase(updateExistingTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload.task; // Access task properly
        console.log("Updated task:", updatedTask);
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        console.log("Found index:", index);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        } else {
          console.warn("Task update failed, no task found.");
        }
      });
  }
});

export default taskSlice.reducer;
