import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchAvailableFilters,
  setSelectedCategory,
  setSelectedType,
  setSortBy,
} from "../Store/collectionSlice";
import AllCollectionCard from "../components/AllCollectionCard";

const Collection = () => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const productsPerPage = 20;

  const {
    allProducts,
    categories = [],
    types = [],
    selectedCategory,
    selectedType,
    sortBy,
  } = useSelector((state) => state.collection);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAvailableFilters());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(setSelectedCategory(selectedCategory === category ? "" : category));
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    dispatch(setSelectedType(selectedType === type ? "" : type));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const clearAllFilters = () => {
    dispatch(setSelectedCategory(""));
    dispatch(setSelectedType(""));
    dispatch(setSortBy(""));
  };

  const filteredProducts = allProducts
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) => (selectedType ? product.type === selectedType : true))
    .sort((a, b) => {
      if (sortBy === "priceHighToLow") return b.price - a.price;
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      return 0;
    });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Box sx={{ display: "flex", p: 3, gap: 3 }}>

      {/* LEFT SIDEBAR - NOW 100% FIXED */}
      <Box
        sx={{
          width: "260px",
          position: "sticky",
          top: 100,
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "black" }}
        >
          Filters
        </Typography>

        {/* CATEGORY */}
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Categories</Typography>
          {categories.map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={selectedCategory === cat}
                  onChange={handleCategoryChange}
                  value={cat}
                />
              }
              label={cat}
            />
          ))}
        </Paper>

        {/* TYPE */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Type</Typography>
          {types.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedType === type}
                  onChange={handleTypeChange}
                  value={type}
                />
              }
              label={type}
            />
          ))}
        </Paper>
      </Box>

      {/* RIGHT CONTENT */}
      <Box sx={{ flexGrow: 1 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            All Collections
          </Typography>

     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  <Button variant="outlined" color="error" onClick={clearAllFilters}>
    Clear Filters
  </Button>

  <Select
    value={sortBy}
    onChange={handleSortChange}
    size="small"
    sx={{ minWidth: 180 }}
  >
    <MenuItem value="Relevant">Sort by: Relevant</MenuItem>
    <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
    <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
  </Select>
       </Box>
        </Box>

        {/* PRODUCT GRID */}
        <Grid container spacing={3}>
          {paginatedProducts.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
              <AllCollectionCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Collection;
