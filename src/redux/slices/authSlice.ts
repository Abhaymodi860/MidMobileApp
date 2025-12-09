import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async thunk to check if user is already logged in (from AsyncStorage)
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user: User = JSON.parse(userString);
        return user;
      }
      return null;
    } catch (error) {
      throw new Error('Failed to check auth status');
    }
  },
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Mock login - In real app, this would call your API
      // For this task, we'll accept any username/password
      if (credentials.username && credentials.password) {
        const user: User = {
          id: '1',
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          token: 'mock-jwt-token-' + Date.now(),
        };

        // Save to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));

        return user;
      } else {
        return rejectWithValue('Username and password are required');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await AsyncStorage.removeItem('user');
    return null;
  } catch (error) {
    throw new Error('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous actions
    clearError: state => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: builder => {
    // Check Auth Status
    builder.addCase(checkAuthStatus.pending, state => {
      state.loading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to check auth status';
    });

    // Login
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Login failed';
    });

    // Logout
    builder.addCase(logoutUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Logout failed';
    });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
