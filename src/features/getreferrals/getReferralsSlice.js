import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getReferrals } from '../../apiClient';

const initialState = {
  status: 'idle'
};

export const queryAsync = createAsyncThunk(
    'getReferrals/queryAsync',
    async (data) => {
        const response = await getReferrals(data);
        return response.data;
    }
);

export const getReferralsSlice = createSlice({
  name: 'getReferrals',
  initialState,
  reducers: {
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            });
    },
  }
});

export const selectStatus = (state) => state.getReferrals.status;

export default getReferralsSlice.reducer;
