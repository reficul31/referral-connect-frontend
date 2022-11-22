import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login } from '../../apiClient';

const initialState = {
  email: '',
  password: '',
  status: 'idle'
};

export const queryAsync = createAsyncThunk(
    'login/queryAsync',
    async (data) => {
        const response = await login(data);
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
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(queryAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(queryAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        });
  }
});

export const { setEmail, setPassword } = loginSlice.actions;

export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;

export default loginSlice.reducer;
