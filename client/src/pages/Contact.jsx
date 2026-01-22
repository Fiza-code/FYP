import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  InputBase,
} from "@mui/material";

const Contact = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 6,
          fontWeight: "bold",
          color: "black",
        }}
      >
        CONTACT <span style={{ color: "grey" }}>US</span>
        <Box
          sx={{
            width: "60px",
            height: "3px",
            backgroundColor: "black",
            mx: "auto",
            mt: 1,
          }}
        />
      </Typography>

      {/* Image + Info */}
      <Grid container spacing={6} alignItems="center">
        {/* Left Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://foreverbuy.in/assets/contact_img-CyOum2vk.png"
            alt="Contact"
            sx={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px",
              display: "block",
              mx: "auto",
            }}
          />
        </Grid>

        {/* Right Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Our Store
          </Typography>
          <Typography variant="body1" sx={{ color: "grey", mb: 2 }}>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </Typography>
          <Typography variant="body1" sx={{ color: "grey", mb: 2 }}>
            Tel: 03124330949 <br />
            Email: admin@nexawear.com
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Careers at Forever
          </Typography>
          <Typography variant="body1" sx={{ color: "grey", mb: 3 }}>
            Learn more about our teams and job openings.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              borderColor: "black",
              color: "black",
              "&:hover": { backgroundColor: "black", color: "white" },
            }}
          >
            Explore Jobs
          </Button>
        </Grid>
      </Grid>

      {/* Google Map */}
      <Box sx={{ mt: 8 }}>
        <iframe
          title="store-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509323!2d144.95565131531686!3d-37.81732397975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775c3e7d9a4b0!2s54709%20Willms%20Station%2C%20Suite%20350%2C%20Washington%2C%20USA!5e0!3m2!1sen!2sus!4v1631181632048!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Box>

      {/* ✅ Subscribe Section */}
      <Container sx={{ textAlign: "center", py: 6 }}>
        <Typography
          variant="h6"
          sx={{ color: "black", fontWeight: "bold", mb: 2 }}
        >
          Subscribe Now & Get 50% Off
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#555", mb: 3, maxWidth: "600px", mx: "auto" }}
        >
          Join our newsletter and be the first to know about exclusive offers,
          new arrivals, and special discounts.
        </Typography>

        {/* Input + Button combined */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 500,
            mx: "auto",
            width: "100%",
            border: "1px solid #ddd",
          }}
        >
          <InputBase
            placeholder="Enter your email"
            sx={{
              flex: 1,
              px: 2,
              py: 1,
              fontSize: "0.95rem",
              backgroundColor: "#fff",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: 0,
              px: 3,
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
