import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { giveReferral, giveReferrals } from '../../apiClient';
import { shallowEqual } from '../../utils';

const initialState = {
    referrals: [],
    status: 'idle',
    error: '',
    info: ''
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

export const giveReferralAsync = createAsyncThunk(
    'giveReferrals/giveReferralAsync',
    async ({secret, data}, {rejectWithValue}) => {
        try {
            const headers = {secret};
            const response = await giveReferral(data, headers);
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
    reducers: {
        removeReferral: (state, action) => {
            state.referrals = state.referrals.filter((r) => !shallowEqual(r, action.payload))
        }
    },
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
            })
            .addCase(giveReferralAsync.pending, (state) => {
                state.error = '';
                state.info = '';
                state.status = 'loading';
            })
            .addCase(giveReferralAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
                state.info = '';
            })
            .addCase(giveReferralAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = '';
                state.info = action.payload;
            });
    }
});

export const selectInfo = (state) => state.giveReferrals.info;
export const selectError = (state) => state.giveReferrals.error;
export const selectReferrals = (state) => state.giveReferrals.referrals;

export const { removeReferral } = giveReferralsSlice.actions;

export default giveReferralsSlice.reducer;