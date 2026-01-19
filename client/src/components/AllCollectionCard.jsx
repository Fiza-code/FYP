import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

// StarRating component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= rating ? "#FFD700" : "#ccc" }}>
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
};

const AllCollectionCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/product/${product._id}`)}
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        height: 350, // fixed size
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",

        // ⭐ HOVER EFFECT
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* <CardMedia
        component="img"
        // image={product.image}
        image={`${API_URL}${product.image}`}
        alt={product.name}
        sx={{
          height: 180, // fixed image size
          objectFit: "cover",
          transition: "transform 0.3s ease",
        }}
      /> */}
      <CardMedia
  component="img"
  image={
    product.image.startsWith("http")
      ? product.image // external URL
      : `${API_URL}${product.image}` // local upload
  }
  alt={product.name}
  sx={{
    height: 180,
    objectFit: "cover",
    transition: "transform 0.3s ease",
  }}
/>


      <CardContent
        sx={{
          flexGrow: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
          noWrap
        >
          {product.name}
        </Typography>

        <StarRating rating={product.rating} />

        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AllCollectionCard;

