import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { giveReferrals } from '../../apiClient';

const initialState = {
    referrals: [],
    status: 'idle'
};

export const queryAsync = createAsyncThunk(
    'giveReferrals/queryAsync',
    async () => {
        const response = await giveReferrals();
        return response.data;
    }
);

export const giveReferralsSlice = createSlice({
    name: 'giveReferrals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.referrals = action.payload;
            });
    }
});

export const selectReferrals = (state) => state.giveReferrals.referrals;

export default giveReferralsSlice.reducer;