import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

// Fetch latest products
export const fetchLatestProducts = createAsyncThunk(
  'products/fetchLatest',
  async () => {
    const res = await axios.get(`${API_URL}/api/products/latest`);
    return res.data;
  }
);

// Fetch best sellers
export const fetchBestSellers = createAsyncThunk(
  'products/fetchBestSellers',
  async () => {
    const res = await axios.get(`${API_URL}/api/products/best-sellers`);
    return res.data;
  }
);

// Fetch collection products (with filters/sort)
export const fetchCollectionProducts = createAsyncThunk(
  'products/fetchCollection',
  async ({ category = '', type = '', sort = '' }) => {
    const res = await axios.get(`${API_URL}/products/collection`, {
      params: { category, type, sort },
    });
    return res.data;
  }
);

// Fetch a single product by ID for the detail page
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId) => {
    const res = await axios.get(`${API_URL}/api/products/${productId}`);
    return res.data;
  }
);

// AI-powered Size Recommendation
export const fetchSizeRecommendation = createAsyncThunk(
  'products/fetchSizeRecommendation',
  async ({ productId, measurements }) => {
    // This new backend endpoint will take user measurements and return a size.
    const res = await axios.post(`${API_URL}/api/products/${productId}/size-recommendation`, { measurements });
    return res.data; // e.g., { recommendedSize: 'M', reasoning: '...' }
  }
);

// Fetch AI-generated outfit recommendation for a product
export const fetchOutfitRecommendation = createAsyncThunk(
  'products/fetchOutfitRecommendation',
  async (productId) => {
    // This new backend endpoint would use an AI service to find complementary items.
    const res = await axios.get(`${API_URL}/api/products/${productId}/outfit-recommendation`);
    return res.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    latestProducts: [],
    bestSellers: [],
    collectionProducts: [],
    status: 'idle',
    error: null,
    product: null, // To store single product details
    outfitRecommendation: [], // To store AI-generated outfit
    outfitStatus: 'idle',
    outfitError: null,
    // New state for size recommendation
    sizeRecommendation: null,
    sizeStatus: 'idle',
    sizeError: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.outfitRecommendation = [];
      state.sizeRecommendation = null;
      state.sizeStatus = 'idle';
    },
    clearSizeRecommendation: (state) => {
      state.sizeRecommendation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Latest products
      .addCase(fetchLatestProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.latestProducts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Best sellers
      .addCase(fetchBestSellers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Collection products (with filters and sorting)
      .addCase(fetchCollectionProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollectionProducts.fulfilled, (state, action) => {
        state.collectionProducts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCollectionProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Single product for detail page
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.product = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // AI Outfit Recommendation
      .addCase(fetchOutfitRecommendation.pending, (state) => {
        state.outfitStatus = 'loading';
      })
      .addCase(fetchOutfitRecommendation.fulfilled, (state, action) => {
        state.outfitRecommendation = action.payload;
        state.outfitStatus = 'succeeded';
      })
      .addCase(fetchOutfitRecommendation.rejected, (state, action) => {
        state.outfitStatus = 'failed';
        state.outfitError = action.error.message;
      })

      // AI Size Recommendation
      .addCase(fetchSizeRecommendation.pending, (state) => {
        state.sizeStatus = 'loading';
      })
      .addCase(fetchSizeRecommendation.fulfilled, (state, action) => {
        state.sizeRecommendation = action.payload;
        state.sizeStatus = 'succeeded';
      })
      .addCase(fetchSizeRecommendation.rejected, (state, action) => {
        state.sizeStatus = 'failed';
        state.sizeError = action.error.message;
      });
  },
});

export const { clearProduct, clearSizeRecommendation } = productsSlice.actions;
export default productsSlice.reducer;
