import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { giveReferrals } from '../../apiClient';

const initialState = {
    referrals: [],
    status: 'idle',
    error: ''
};

export const queryAsync = createAsyncThunk(
    'giveReferrals/queryAsync',
    async ({secret}, {rejectWithValue}) => {
        try {
            const headers = { secret };
            const response = await giveReferrals(headers);
            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const giveReferralsSlice = createSlice({
    name: 'giveReferrals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.error = '';
                state.status = 'loading';
            })
            .addCase(queryAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
                state.referrals = [];
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = '';
                state.referrals = action.payload;
            });
    }
});

export const selectError = (state) => state.giveReferrals.error;
export const selectReferrals = (state) => state.giveReferrals.referrals;

export default giveReferralsSlice.reducer;