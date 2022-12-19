import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login } from '../../apiClient';

const initialState = {
  email: '',
  password: '',
  status: 'idle',
  secret: '',
  error: ''
};

export const queryAsync = createAsyncThunk(
    'login/queryAsync',
    async (data, { rejectWithValue }) => {
      try {
        const response = await login(data);
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
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
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(queryAsync.pending, (state) => {
            state.error = '';
            state.status = 'loading';
        })
        .addCase(queryAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.secret = '';
            state.status = 'idle';
        })
        .addCase(queryAsync.fulfilled, (state, action) => {
            state.error = '';
            state.status = 'idle';
            state.secret = action.payload;
        });
  }
});

export const { setEmail, setPassword, setSecret } = loginSlice.actions;

export const selectError = (state) => state.login.error;
export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectSecret = (state) => state.login.secret;

export default loginSlice.reducer;
