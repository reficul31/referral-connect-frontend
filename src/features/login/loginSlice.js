import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login } from '../../apiClient';

const initialState = {
  email: '',
  password: '',
  status: 'idle',
  isAuthenticated: false,
  secret: ''
};

export const queryAsync = createAsyncThunk(
    'login/queryAsync',
    async (data, { rejectWithValue }) => {
        const response = await login(data, rejectWithValue);
        return response.data;
    }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setSecret: (state, action) => {
      state.secret = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(queryAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(queryAsync.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.secret = '';
            state.status = 'idle';
        })
        .addCase(queryAsync.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.secret = action.payload;
            state.status = 'idle';
        });
  }
});

export const { setEmail, setPassword, setIsAuthenticated, setSecret } = loginSlice.actions;

export const selectIsAuthenticated = (state) => state.login.isAuthenticated;
export const selectSecret = (state) => state.login.secret;
export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;

export default loginSlice.reducer;
