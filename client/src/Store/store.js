import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import  navbarReducer from './navbarSlice'
import authReducer from './authSlice'
import cartReducer from './cartSlice';
import filtersReducer from './filtersSlice';
import collectionReducer from './collectionSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    navbar: navbarReducer,
    auth: authReducer,
    cart: cartReducer,
    filters: filtersReducer,
   collection: collectionReducer, 
  },
});
