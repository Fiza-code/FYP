import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  'collection/fetchAllProducts',
  async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    return res.data;
  }
);

// Fetch available categories and types for filters
export const fetchAvailableFilters = createAsyncThunk(
  'collection/fetchAvailableFilters',
  async () => {
    const res = await axios.get('http://localhost:5000/api/products/filters');
    return res.data;
  }
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    allProducts: [],
    categories: [],
    types: [],
    selectedCategory: '',
    selectedType: '',
    sortBy: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload === state.selectedCategory ? '' : action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload === state.selectedType ? '' : action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAvailableFilters.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.types = action.payload.types;
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedType,
  setSortBy,
} = collectionSlice.actions;

export default collectionSlice.reducer;
