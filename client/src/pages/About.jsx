import React from 'react';
import { Box, Typography, Container, Button, InputBase } from '@mui/material';

const About = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 6,
      }}
    >
      {/* Top Heading */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          color: 'grey',
          textAlign: 'center',
          mb: 6,
          textTransform: 'uppercase',
          letterSpacing: 2,
          '& span': { color: 'black' },
        }}
      >
        About <span>Us</span>
      </Typography>

      {/* Content (Image + Text) */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          mb: 8,
        }}
      >
        {/* Left - Image */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://foreverbuy.in/assets/about_img-BAJyTXw9.png"
            alt="About"
            style={{
              maxWidth: '240px',
              height: '180px',
              objectFit: 'contain',
              borderRadius: '10px',
            }}
          />
        </Box>

        {/* Right - Text */}
        <Box sx={{ flex: 2, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="body2"
            sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6, mb: 2 }}
          >
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. 
            Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, 
            and purchase a wide range of products from the comfort of their homes.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6, mb: 2 }}
          >
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that 
            cater to every taste and preference. From fashion and beauty to electronics and home essentials, 
            we offer an extensive collection sourced from trusted brands and suppliers.
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: '#222' }}
          >
            Our Mission
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}
          >
            Our mission is to empower customers with choice, convenience, and confidence. 
            We’re dedicated to providing a seamless shopping experience that exceeds expectations, 
            from browsing and ordering to delivery and beyond.
          </Typography>
        </Box>
      </Container>

      {/* ✅ Why Choose Us Section */}
      <Container>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            color: 'grey',
            '& span': { color: 'black' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Why <span>Choose Us</span>
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 3,
            mb: 8,
          }}
        >
          <Box
            sx={{
              border: '1px solid grey',
              borderRadius: 2,
              p: 7,
              textAlign: 'center',
              flex: 1,
              transition: '0.3s',
              '&:hover': { boxShadow: 3, transform: 'scale(1.05)' },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: '#222' }}>
              Quality Products
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              We provide only the best products sourced from trusted suppliers to ensure top-notch quality.
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid grey',
              borderRadius: 2,
              p: 7,
              textAlign: 'center',
              flex: 1,
              transition: '0.3s',
              '&:hover': { boxShadow: 3, transform: 'scale(1.05)' },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: '#222' }}>
              Customer Support
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Our dedicated team is always available to help you with any queries or concerns.
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid grey',
              borderRadius: 2,
              p: 7,
              textAlign: 'center',
              flex: 1,
              transition: '0.3s',
              '&:hover': { boxShadow: 3, transform: 'scale(1.05)' },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: '#222' }}>
              Fast Delivery
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              We ensure quick and safe delivery so your products reach you on time, every time.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* ✅ Subscribe Section (Updated) */}
      <Container sx={{ textAlign: 'center', py: 6 }}>
        <Typography
          variant="h6"
          sx={{ color: 'black', fontWeight: 'bold', mb: 2 }}
        >
          Subscribe Now & Get 50% Off
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: '#555', mb: 3, maxWidth: '600px', mx: 'auto' }}
        >
          Join our newsletter and be the first to know about exclusive offers, new arrivals, and special discounts.
        </Typography>

        {/* Input + Button combined */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 500,
            mx: 'auto',
            width: '100%',
            border: '1px solid #ddd',
          }}
        >
          <InputBase
            placeholder="Enter your email"
            sx={{
              flex: 1,
              px: 2,
              py: 1,
              fontSize: '0.95rem',
              backgroundColor: '#fff',
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: 0,
              px: 3,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
