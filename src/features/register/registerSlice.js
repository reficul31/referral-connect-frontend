import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { register } from '../../apiClient';

const initialState = {
  personalInformation: {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    company: '',
    phone: '',
    password: ''
  },
  resume: null,
  status: 'idle'
};

export const queryAsync = createAsyncThunk(
    'register/queryAsync',
    async (data) => {
        const response = await register(data);
        return response.data;
    }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInformation.firstName = action.payload.firstName;
      state.personalInformation.lastName = action.payload.lastName;
      state.personalInformation.email = action.payload.email;
      state.personalInformation.dob = action.payload.dob;
      state.personalInformation.company = action.payload.company;
      state.personalInformation.phone = action.payload.phone;
      state.personalInformation.password = action.payload.password;
    },
    setResume: (state, action) => {
      state.resume = action.payload;
    },
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

export const { setPersonalInfo, setResume } = registerSlice.actions;

export const selectPersonalInfo = (state) => state.register.personalInformation;
export const selectResume = (state) => state.register.resume;

export default registerSlice.reducer;
