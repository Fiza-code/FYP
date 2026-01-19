import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellers } from '../Store/productsSlice';
import {
  Typography,
  Grid,
  Box
} from '@mui/material';
import ProductCard from '../components/ProductCard';

const BestSellers = () => {
  const dispatch = useDispatch();
  const bestSellers = useSelector((state) => state.products.bestSellers);

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontFamily="Arial" gutterBottom>
          <span style={{ color: 'grey' }}>Best </span>
          <span style={{ color: 'black' }}>Sellers</span>
        </Typography>
          <Typography
                variant="body1"
                align="center"
                fontFamily="sans-serif"
                gutterBottom
              >
Explore our Best Sellers – the most popular products loved by our customers.     </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {bestSellers.map((product) => (
          <Grid
            item
            key={product._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
            justifyContent="center"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSellers;
