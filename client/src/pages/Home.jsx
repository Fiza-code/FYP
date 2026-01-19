import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import hero from '../assets/hero.jpg';
import LatestCollection from './LatestCollection';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: '90vh',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            border: '2px solid grey',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            padding: 4,
            height: { xs: 400, md: 500 },
            maxWidth: { xs: 320, sm: 500, md: 1000 },
            boxShadow: 3,
          }}
        >
          {/* Left - Text */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pr: { md: 4 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Arial, sans-serif', color: '#333', mb: 2 }}
            >
              Welcome!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Arial, sans-serif',
                color: '#555',
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              This is a responsive homepage layout. The box stays centered with fixed height, perfect for a clean landing section.
            </Typography>
          </Box>

          {/* Right - Image */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: { xs: 3, md: 0 },
            }}
          >
            <img
              src={hero}
              alt="Sample"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '10px',
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* ✅ Add LatestCollection here */}
      <LatestCollection />
    </>
  );
};

export default Home;
