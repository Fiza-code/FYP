// redux/slices/navBarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navBarSlice = createSlice({
  name: 'navbar',
  initialState: {
    drawerOpen: false,
    showSearch: false,
    anchorEl: null,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    toggleSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
    openMenu: (state, action) => {
      state.anchorEl = action.payload;
    },
    closeMenu: (state) => {
      state.anchorEl = null;
    },
  },
});

export const {
  toggleDrawer,
  closeDrawer,
  toggleSearch,
  openMenu,
  closeMenu,
} = navBarSlice.actions;

export default navBarSlice.reducer;
