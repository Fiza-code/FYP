import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateQuantity, deleteProduct } from "../Store/cartSlice";
import { API_URL } from "../config";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.cart);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantity = (productId, action) => {
    dispatch(updateQuantity({ productId, action }));
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const totalPrice = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.quantity || 1),
    0
  );

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!customer.name) tempErrors.name = "Name is required";
    if (!customer.email)
      tempErrors.email = /\S+@\S+\.\S+/.test(customer.email)
        ? ""
        : "Email is invalid";
    if (!customer.phone) tempErrors.phone = "Phone is required";
    if (!customer.address) tempErrors.address = "Address is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!products || products.length === 0) {
      alert("❌ Cart is empty!");
      return;
    }
    setCheckoutOpen(true);
  };

  const handleOrderNow = () => {
    if (!validateForm()) return;
    setPaymentDialogOpen(true);
  };

  const handlePayment = async (method) => {
    if (!products || products.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderItems = products.map((p) => ({
      productId: p._id || p.productId,
      name: p.name || "Unnamed Product",
      image: p.image || "",
      price: Number(p.price || 0),
      quantity: Number(p.quantity || 1),
    }));

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          paymentMethod: method,
          items: orderItems,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully!");
        setCheckoutOpen(false);
        setPaymentDialogOpen(false);
        setCustomer({ name: "", email: "", phone: "", address: "" });
        dispatch(fetchCart());
      } else {
        alert("❌ " + (data.error || "Failed to place order"));
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Failed to place order");
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={4} display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
      {/* Cart Table */}
      <Box flex={1}>
        <Typography variant="h4" mb={3}>
          Shopping Cart
        </Typography>

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
                <TableRow key={p._id || p.productId}>
                  <TableCell>
                    <img
                      src={p.image?.startsWith("http") ? p.image : `${API_URL}${p.image}`}
                      alt={p.name}
                      width="70"
                      style={{ borderRadius: 8 }}
                    />
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleQuantity(p._id || p.productId, "decrease")}>
                      <Remove />
                    </IconButton>
                    {p.quantity}
                    <IconButton onClick={() => handleQuantity(p._id || p.productId, "increase")}>
                      <Add />
                    </IconButton>
                  </TableCell>
                  <TableCell>${(Number(p.price || 0) * Number(p.quantity || 1)).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(p._id || p.productId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="black" size="large" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      </Box>

      {/* Customer Form */}
      {checkoutOpen && (
        <Box flex={1} component={Paper} p={3}>
          <Typography variant="h5" mb={2}>
            Customer Details
          </Typography>

          {["name", "email", "phone", "address"].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={customer[field]}
              onChange={handleInputChange}
              error={!!errors[field]}
              helperText={errors[field]}
              sx={{ mb: 2 }}
              multiline={field === "address"}
              rows={field === "address" ? 3 : 1}
            />
          ))}

          <Button variant="contained" color="black" fullWidth onClick={handleOrderNow}>
            Order Now
          </Button>
        </Box>
      )}

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <Typography>Choose how you want to pay:</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePayment("COD")}>Cash on Delivery</Button>
          <Button onClick={() => handlePayment("Stripe")} color="primary">
            Stripe
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
