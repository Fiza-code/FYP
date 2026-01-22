// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_URL } from '../config';

// // Fetch all products
// export const fetchAllProducts = createAsyncThunk(
//   'collection/fetchAllProducts',
//   async () => {
//     const res = await axios.get(API_URL);
//     return res.data;
//   }
// );

// // Fetch available categories and types for filters
// export const fetchAvailableFilters = createAsyncThunk(
//   'collection/fetchAvailableFilters',
//   async () => {
//     const res = await axios.get(API_URL);
//     return res.data;
//   }
// );

// const collectionSlice = createSlice({
//   name: 'collection',
//   initialState: {
//     allProducts: [],
//     categories: [],
//     types: [],
//     selectedCategory: '',
//     selectedType: '',
//     sortBy: '',
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setSelectedCategory: (state, action) => {
//       state.selectedCategory = action.payload === state.selectedCategory ? '' : action.payload;
//     },
//     setSelectedType: (state, action) => {
//       state.selectedType = action.payload === state.selectedType ? '' : action.payload;
//     },
//     setSortBy: (state, action) => {
//       state.sortBy = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.allProducts = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchAvailableFilters.fulfilled, (state, action) => {
//         state.categories = action.payload.categories;
//         state.types = action.payload.types;
//       });
//   },
// });

// export const {
//   setSelectedCategory,
//   setSelectedType,
//   setSortBy,
// } = collectionSlice.actions;

// export default collectionSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

const PRODUCTS_API = `${API_URL}/api/products`;

export const fetchAllProducts = createAsyncThunk(
  "collection/fetchAllProducts",
  async () => {
    const res = await axios.get(PRODUCTS_API);
    // 🔥 FORCE ARRAY
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.products)) return res.data.products;
    console.error("Invalid products response:", res.data);
    return [];
  }
);

export const fetchAvailableFilters = createAsyncThunk(
  "collection/fetchAvailableFilters",
  async () => {
    const res = await axios.get(`${PRODUCTS_API}/filters`);
    return res.data || { categories: [], types: [] };
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    allProducts: [],
    categories: [],
    types: [],
    selectedCategory: "",
    selectedType: "",
    sortBy: "",
    status: "idle",
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchAvailableFilters.fulfilled, (state, action) => {
        state.categories = action.payload.categories || [];
        state.types = action.payload.types || [];
      });
  },
});

export const { setSelectedCategory, setSelectedType, setSortBy } = collectionSlice.actions;
export default collectionSlice.reducer;

