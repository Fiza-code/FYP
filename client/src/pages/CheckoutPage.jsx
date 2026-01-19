import React, { useEffect, useState } from "react";
import {
  Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Paper, CircularProgress, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateQuantity, deleteProduct } from "../Store/cartSlice";
import axios from "axios";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.cart);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantity = (productId, action) => {
    dispatch(updateQuantity({ productId, action }));
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOrderNow = async () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill all customer fields");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        userId: "user123", // replace with auth user
        customer,
        paymentMethod,
      });
      alert("✅ Order placed successfully!");
      setOrderDialogOpen(false);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to place order");
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box display="flex" gap={4} p={4}>
      {/* Cart Table */}
      <Box flex={1}>
        <Typography variant="h4" mb={3}>Shopping Cart</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.productId}>
                  <TableCell><img src={p.image} alt={p.name} width="70" style={{ borderRadius: 8 }} /></TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleQuantity(p.productId, "decrease")}><Remove /></IconButton>
                    {p.quantity}
                    <IconButton onClick={() => handleQuantity(p.productId, "increase")}><Add /></IconButton>
                  </TableCell>
                  <TableCell>${(p.price * p.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(p.productId)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Customer Form */}
      <Box flex={1} component={Paper} p={3}>
        <Typography variant="h5" mb={2}>Customer Details</Typography>
        <TextField fullWidth label="Name" name="name" value={customer.name} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Email" name="email" value={customer.email} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Phone" name="phone" value={customer.phone} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Address" name="address" value={customer.address} onChange={handleInputChange} margin="normal" multiline rows={3} />
        <Typography variant="h6" mt={2}>Total: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOrderDialogOpen(true)}>Order Now</Button>
      </Box>

      {/* Payment Method Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Button variant={paymentMethod === "COD" ? "contained" : "outlined"} onClick={() => setPaymentMethod("COD")}>Cash On Delivery</Button>
            <Button variant={paymentMethod === "Stripe" ? "contained" : "outlined"} onClick={() => setPaymentMethod("Stripe")}>Stripe</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOrderNow} variant="contained" color="primary">Confirm Order</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutPage;
