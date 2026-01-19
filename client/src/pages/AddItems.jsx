// src/pages/AddItems.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../config";

const AddItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [category, setCategory] = useState("Men");
  const [type, setType] = useState("Topwear");
  const [isNew, setIsNew] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Image preview
  const handleImageChange = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // --- Upload image to backend
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${API_URL}/api/upload/product-image`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data.imageUrl; // returns /uploads/filename.jpg
  };

  // --- Submit product
  const handleSubmit = async () => {
    if (!name || !price || !image) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Upload image first
      const imageUrl = await uploadImage(image);

      // 2️⃣ Send product data
      const res = await axios.post(`${API_URL}/api/products`, {
        name,
        price,
        description,
        stars,
        category,
        type,
        isNew,
        image: imageUrl,
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setStars("");
      setCategory("Men");
      setType("Topwear");
      setIsNew(false);
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Add product error:", err.response?.data || err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: "450px",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Add Product
        </Typography>

        {/* Upload Image */}
        <Button
          variant="outlined"
          component="label"
          sx={{ mb: 1.5, width: "100%" }}
        >
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
        </Button>

        {/* Image Preview */}
        {preview && (
          <Box
            mb={1.5}
            sx={{
              width: "100%",
              height: 180,
              border: "1px solid #ccc",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}

        {/* Product Fields */}
        <TextField
          fullWidth
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          minRows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
        />

        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          size="small"
        />

        <TextField
          fullWidth
          label="Stars (1-5)"
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          size="small"
        />

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
          >
            <MenuItem value="Men">Men</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
            <MenuItem value="Kids">Kids</MenuItem>
          </Select>

          <Select
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
            size="small"
          >
            <MenuItem value="Topwear">Topwear</MenuItem>
            <MenuItem value="Bottomwear">Bottomwear</MenuItem>
            <MenuItem value="Footwear">Footwear</MenuItem>
          </Select>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={isNew}
              onChange={() => setIsNew(!isNew)}
            />
          }
          label="Is New?"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </Paper>
    </Box>
  );
};

export default AddItems;
