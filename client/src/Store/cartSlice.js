// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_URL } from "../config";


// // ✅ Fetch Cart
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, thunkAPI) => {
//     try {
//       const userId = thunkAPI.getState().auth.user?._id || "user123";
//       const res = await axios.get(`${API_URL}/${userId}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ✅ Add to Cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (product, thunkAPI) => {
//     try {
//       const userId = thunkAPI.getState().auth.user?._id || "user123";
//       const res = await axios.post(`${API_URL}/add`, {
//         userId,
//         productId: product._id,
//       });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ✅ Update Quantity
// export const updateQuantity = createAsyncThunk(
//   "cart/updateQuantity",
//   async ({ productId, action }, thunkAPI) => {
//     try {
//       const userId = thunkAPI.getState().auth.user?._id || "user123";
//       const res = await axios.put(`${API_URL}/update`, {
//         userId,
//         productId,
//         action,
//       });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ✅ Delete Product
// export const deleteProduct = createAsyncThunk(
//   "cart/deleteProduct",
//   async (productId, thunkAPI) => {
//     try {
//       const userId = thunkAPI.getState().auth.user?._id || "user123";
//       const res = await axios.delete(`${API_URL}/delete/${userId}/${productId}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // --- FETCH ---
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload?.products)
//           ? action.payload.products
//           : [];
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // --- ADD ---
//       .addCase(addToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload?.products)
//           ? action.payload.products
//           : state.products;
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // --- UPDATE ---
//       .addCase(updateQuantity.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateQuantity.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload?.products)
//           ? action.payload.products
//           : state.products;
//       })
//       .addCase(updateQuantity.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // --- DELETE ---
//       .addCase(deleteProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload?.products)
//           ? action.payload.products
//           : state.products;
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

const CART_API = `${API_URL}/api/cart`;

// ✅ Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user?._id || "user123";
      const res = await axios.get(`${CART_API}/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user?._id || "user123";
      const res = await axios.post(`${CART_API}/add`, {
        userId,
        productId: product._id,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update Quantity
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, action }, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user?._id || "user123";
      const res = await axios.put(`${CART_API}/update`, {
        userId,
        productId,
        action,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete Product
export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user?._id || "user123";
      const res = await axios.delete(`${CART_API}/delete/${userId}/${productId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload?.products)
          ? action.payload.products
          : [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload?.products)
          ? action.payload.products
          : state.products;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload?.products)
          ? action.payload.products
          : state.products;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload?.products)
          ? action.payload.products
          : state.products;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;

