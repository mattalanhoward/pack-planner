// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import garageReducer from './slices/garageSlice';
import listsReducer from './slices/listsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    garage: garageReducer,
    lists: listsReducer,
  },
});
