import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myReferrals } from '../../apiClient';

const initialState = {
    referrals: [],
    status: 'idle'
};

export const queryAsync = createAsyncThunk(
    'myReferrals/queryAsync',
    async () => {
        const response = await myReferrals();
        return response.data;
    }
);

export const myReferralsSlice = createSlice({
    name: 'myReferrals',
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

export const selectReferrals = (state) => state.myReferrals.referrals;

export default myReferralsSlice.reducer;