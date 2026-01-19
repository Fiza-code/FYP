import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestProducts } from '../Store/productsSlice';
import { Grid, Typography, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import BestSeller from '../pages/BestSellers';

const LatestCollection = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.products.items);
  const products = useSelector((state) => state.products.latestProducts) || [];


  useEffect(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
      <Typography
        variant="h4"
        align="center"
        fontFamily="Arial, sans-serif"
        gutterBottom
      >
        <span style={{ color: 'grey' }}>Latest </span>
        <span style={{ color: 'black' }}>Collection</span>
      </Typography>

      <Typography
        variant="body1"
        align="center"
        fontFamily="sans-serif"
        gutterBottom
      >
Discover our Latest Collection – the newest arrivals curated for modern style and everyday comfort.      </Typography>

      {/* Add spacing between text and grid */}
      <Box mt={4}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
        >
          {products.map((product) => (
            <Grid
              item
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={3} // 10 cards per row on large screens
              display="flex"
              justifyContent="center"
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
        <BestSeller/>
    </Box>
  );
};

export default LatestCollection;
