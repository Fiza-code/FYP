import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AddItems from "./AddItems";
import AllProducts from "./AllProducts";
import Orderspanel from "./Orderspanel";
import { useDispatch } from "react-redux";
import { logout } from "../Store/authSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutClick = () => setOpenDialog(true);
  const handleConfirmLogout = () => {
    dispatch(logout());
    setOpenDialog(false);
    navigate("/");
  };
  const handleCancelLogout = () => setOpenDialog(false);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f9f9f9", overflowY: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleLogoutClick}
            sx={{ backgroundColor: "black", color: "white", textTransform: "none", "&:hover": { backgroundColor: "grey.800" } }}
          >
            Logout
          </Button>
        </Box>

        {/* Nested Routes */}
        <Routes>
          <Route path="add-items" element={<AddItems />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="orders" element={<Orderspanel />} />
          <Route path="" element={<h2>Welcome to Admin Dashboard</h2>} />
        </Routes>
      </Box>

      {/* Logout Dialog */}
      <Dialog open={openDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} sx={{ color: "grey.700" }}>Cancel</Button>
          <Button onClick={handleConfirmLogout} variant="contained" sx={{ backgroundColor: "black", color: "white" }}>Logout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
