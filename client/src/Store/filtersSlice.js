// redux/slices/filtersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
  'filters/fetchCategories',
  async () => {
    const res = await axios.get('/api/products/categories');
    return res.data;
  }
);

export const fetchTypes = createAsyncThunk(
  'filters/fetchTypes',
  async () => {
    const res = await axios.get('/api/products/types');
    return res.data;
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    types: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      });
  },
});

export default filtersSlice.reducer;
