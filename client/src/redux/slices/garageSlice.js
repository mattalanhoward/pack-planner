// src/redux/slices/garageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import garageService from '../../services/garageService';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchGarage = createAsyncThunk(
  'garage/fetchGarage',
  async (_, thunkAPI) => {
    try {
      return await garageService.getItems();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to load gear';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addGearItem = createAsyncThunk(
  'garage/addGearItem',
  async (data, thunkAPI) => {
    try {
      return await garageService.addItem(data);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to add gear';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGearItem = createAsyncThunk(
  'garage/deleteGearItem',
  async (id, thunkAPI) => {
    try {
      await garageService.deleteItem(id);
      return id;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to delete gear';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGarage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGarage.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGarage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addGearItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteGearItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default garageSlice.reducer;
