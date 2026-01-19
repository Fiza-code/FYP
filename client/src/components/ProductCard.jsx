import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../config";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isNew = product.isNew || false;
  const isBestSeller = product.sold >= 50; // adjust threshold as needed

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{ cursor: 'pointer', width: '100%' }}
      onClick={handleCardClick}
    >
      <Card
        sx={{
          width: '100%',
          height: 380, // fixed height for uniform cards
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
          position: 'relative',
        }}
      >
        {/* NEW Badge */}
        {isNew && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: '#4caf50',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              px: 1,
              py: 0.3,
              borderRadius: '4px',
              zIndex: 2,
            }}
          >
            NEW
          </Box>
        )}

        {/* Bestseller Badge */}
        {isBestSeller && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: '#f44336',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              px: 1,
              py: 0.3,
              borderRadius: '4px',
              zIndex: 2,
            }}
          >
            🔥 Bestseller
          </Box>
        )}

        {/* Product Image */}
        <Box sx={{ height: 230, overflow: 'hidden' }}>
          <motion.img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `${API_URL}${product.image}`
            }
            alt={product.name || "Product Image"}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </Box>

        {/* Product Details */}
        <CardContent sx={{ flexGrow: 1, pt: 1 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontSize: 16, fontWeight: 600 }}
          >
            {product.name || "Unnamed Product"}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: 14, fontWeight: 500 }}
          >
            ${product.price ?? 0}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
