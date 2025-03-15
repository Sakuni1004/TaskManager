import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStudents } from '../services/studentServices';

interface Student {
  _id: string;
  studentRegistrationNumber: string;
  username: string;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const students = await getAllStudents();
  return students.data;
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch students';
      });
  },
});

export default studentSlice.reducer;