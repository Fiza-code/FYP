import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  Switch,
  TextField,
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { API_URL } from "../config";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ price: "", category: "" });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Start editing
  const startEdit = (index) => {
    setEditIndex(index);
    setEditData({
      price: products[index].price,
      category: products[index].category || "",
    });
  };

  // Save edited data
  const saveEdit = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? updated : p))
        );
        setEditIndex(null);
      } else {
        console.error("Failed to update product");
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      } else {
        console.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Toggle delivery status
  const toggleDelivery = async (productId, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delivered: !currentStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? updated : p))
        );
      }
    } catch (err) {
      console.error("Error updating delivery status:", err);
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={4} pb={12} sx={{ overflowX: "auto" }}>
      <Typography variant="h4" mb={3}>
        All Products
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p, index) => (
              <TableRow key={p._id}>
                {/* Image */}
                <TableCell>
                  <img
                    src={p.image?.startsWith("http") ? p.image : `${API_URL}${p.image}`}
                    alt={p.name}
                    width="70"
                    style={{ borderRadius: 8 }}
                  />
                </TableCell>

                {/* Name */}
                <TableCell>{p.name || "N/A"}</TableCell>

                {/* Inline editable Price */}
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      type="number"
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({ ...editData, price: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    `$${p.price || 0}`
                  )}
                </TableCell>

                {/* Inline editable Category */}
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    p.category || "N/A"
                  )}
                </TableCell>

                {/* Delivery status */}
                <TableCell>
                  <Switch
                    checked={p.delivered || false}
                    onChange={() => toggleDelivery(p._id, p.delivered || false)}
                    color="success"
                  />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  {editIndex === index ? (
                    <Tooltip title="Save">
                      <IconButton onClick={() => saveEdit(p._id)} color="primary">
                        <Save />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit">
                      <IconButton onClick={() => startEdit(index)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => deleteProduct(p._id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllProducts;
