import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ showSearch, products, onCloseSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  // update suggestions live when typing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setNoResults(false);
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
    setNoResults(false);
  }, [searchQuery, products]);

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;

    // check matches
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ✅ Only navigate if matches exist
    if (filtered.length > 0) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSuggestions([]);
      onCloseSearch();
    } else {
      // show small message instead of navigation
      setNoResults(true);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setSuggestions([]);
    onCloseSearch();
  };

  if (!showSearch) return null;

  return (
    <Box sx={{ width: "70%", mx: "auto", position: "relative" }}>
      <Paper
        sx={{
          mt: 1,
          px: 2,
          py: 0.5,
          display: "flex",
          alignItems: "center",
          boxShadow: 2,
          borderRadius: 5,
        }}
      >
        <InputBase
          placeholder="Search products..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          sx={{ fontSize: "1rem", ml: 1 }}
        />
        <IconButton onClick={handleSearchSubmit}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 10,
            borderRadius: 2,
            maxHeight: 250,
            overflowY: "auto",
          }}
        >
          {suggestions.map((p) => (
            <ListItem
              button
              key={p._id}
              onClick={() => handleSuggestionClick(p._id)}
            >
              <ListItemAvatar>
                <Avatar src={p.image} alt={p.name} />
              </ListItemAvatar>
              <ListItemText
                primary={p.name}
                secondary={`$${p.price}`}
                primaryTypographyProps={{ fontSize: "0.9rem" }}
              />
            </ListItem>
          ))}
        </Paper>
      )}

      {/* No results message */}
      {noResults && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 1, ml: 1, fontStyle: "italic" }}
        >
          Your search is not available
        </Typography>
      )}
    </Box>
  );
};

export default SearchBar;
