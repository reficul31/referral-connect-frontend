import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getReferrals } from '../../apiClient';

const initialState = {
  error: '',
  info: '',
  status: 'idle'
};

export const queryAsync = createAsyncThunk(
    'getReferrals/queryAsync',
    async ({secret, data}, {rejectWithValue}) => {
        try {
            const headers = { secret };
            const response = await getReferrals(data, headers);
            if (response.status === 200) {
                return response.data;                
            } else {
                return rejectWithValue(response.data);
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getReferralsSlice = createSlice({
    name: 'getReferrals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.error = '';
                state.info = '';
                state.status = 'loading';
            })
            .addCase(queryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.info = '';
                state.status = 'idle';
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.error = '';
                state.info = action.payload;
                state.status = 'idle';
            });
    }
});

export const selectInfo = (state) => state.getReferrals.info;
export const selectError = (state) => state.getReferrals.error;
export const selectStatus = (state) => state.getReferrals.status;

export default getReferralsSlice.reducer;
