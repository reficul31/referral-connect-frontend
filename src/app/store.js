import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/registerSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register: registerReducer
  },
});
