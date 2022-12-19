import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myReferrals } from '../../apiClient';

const initialState = {
    referrals: [],
    status: 'idle',
    error: ''
};

export const queryAsync = createAsyncThunk(
    'myReferrals/queryAsync',
    async ({secret}, {rejectWithValue}) => {
        try {
            const headers = {secret};
            const response = await myReferrals(headers);
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

export const myReferralsSlice = createSlice({
    name: 'myReferrals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.error = '';
                state.referrals = [];
                state.status = 'loading';
            })
            .addCase(queryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.referrals = [];
                state.status = 'idle';
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.error = '';
                state.referrals = action.payload;
                state.status = 'idle';
            });
    }
});

export const selectError = (state) => state.myReferrals.error;
export const selectReferrals = (state) => state.myReferrals.referrals;

export default myReferralsSlice.reducer;