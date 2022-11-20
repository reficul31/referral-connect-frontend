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
  experience: [],
  education: [],
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
    addExperience: (state, action) => {
      state.experience = [...state.experience, action.payload];
    },
    removeExperience: (state, action) => {
      state.experience = state.experience.filter((e) => e.company !== action.payload.company && e.role !== action.payload.role)
    },
    addEducation: (state, action) => {
      state.education = [...state.education, action.payload];
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter((e) => e.level !== action.payload.level && e.college !== action.payload.college)
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

export const { setPersonalInfo, setResume, addExperience, removeExperience, addEducation, removeEducation } = registerSlice.actions;

export const selectPersonalInfo = (state) => state.register.personalInformation;
export const selectResume = (state) => state.register.resume;
export const selectExperience = (state) => state.register.experience;
export const selectEducation = (state) => state.register.education;

export default registerSlice.reducer;