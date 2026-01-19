import React from 'react';
import { Box, Typography, Grid, Link, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const companyLinks = [
  { text: 'Home', path: '/' },
  { text: 'About us', path: '/about' },
  { text: 'Collection', path: '/collection' },
  { text: 'Contact', path: '/contact' },
];

const contactInfo = [
  { text: '+1-000-000-0000', href: 'tel:+10000000000' },
  { text: 'greatstackdev@gmail.com', href: 'mailto:greatstackdev@gmail.com' },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        fontFamily: 'Arial, sans-serif',
        py: 4,
        px: 2,
        mt: 'auto', // Pushes footer to the bottom
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand and paragraph */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" component="p" fontWeight="bold">
              FOREVER<span style={{ color: '#D08CAB' }}>.</span>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                textAlign: 'justify',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text since the 1500s.
            </Typography>
          </Grid>

          {/* COMPANY links */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              COMPANY
            </Typography>
            {companyLinks.map((link) => (
              <Link
                key={link.text}
                component={RouterLink}
                to={link.path}
                variant="body2"
                underline="hover"
                color="text.secondary"
                display="block"
                sx={{ mb: 0.5 }}
              >
                {link.text}
              </Link>
            ))}
          </Grid>

          {/* GET IN TOUCH */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              GET IN TOUCH
            </Typography>
            {contactInfo.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                variant="body2"
                underline="hover"
                color="text.secondary"
                display="block"
                sx={{
                  mb: 0.5,
                  wordBreak: 'break-word',
                }}
              >
                {item.text}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* COPYRIGHT */}
        <Box mt={4} textAlign="center">
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} greatstack.dev – All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
