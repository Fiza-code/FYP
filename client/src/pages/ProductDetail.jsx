import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { addToCart } from "../Store/cartSlice";
import { API_URL } from "../config";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ✅ Fetch single product
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    if (!product?._id) return;

    dispatch(addToCart(product)); // pass the whole product object
    setSnackbarOpen(true);

    setTimeout(() => navigate("/cart"), 1200);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
    );

  if (!product)
    return <Typography variant="h6">Product not found</Typography>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Card
        sx={{
          maxWidth: 800,
          p: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        {/* Product Image */}
        <Box sx={{ flex: 1, height: { xs: 230, md: 350 }, overflow: "hidden" }}>
          <motion.img
            src={
              product.image.startsWith("http")
                ? product.image // external URL
                : `${API_URL}${product.image}` // local upload
            }
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Box>

        {/* Product Info */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description || "No description available."}
          </Typography>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddToCart}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>

      {/* ✅ Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ✅ Product added to cart
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
