import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUpUserService } from '../services/signupServices';
import { loginUser } from '../services/loginServices';

interface AuthState {
  userRole: any;
  user: any | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  token: null,
  role: null,
  userRole: undefined
};

// Signup Action
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (
    { username, email, password, role, studentRegistrationNumber }: 
    { username: string; email: string; password: string; role: "student" | "teacher"; studentRegistrationNumber?: string }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await signUpUserService(
        username,
        email,
        password,
        role,
        studentRegistrationNumber
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong!');
    }
  }
);

// Login Action
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    
    try {
      const { message, role, token } = await loginUser(credentials.email, credentials.password);
      return { message, role, token };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to log in');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = 'Signup successful!';

        alert("Signup successful!");
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = action.payload.role;
        window.location.href = action.payload.role === "student" ? "/studentDashboard" : "/teacherDashboard"; 

      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMessages } = authSlice.actions;

export default authSlice.reducer;


