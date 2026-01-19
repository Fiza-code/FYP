// src/components/AuthDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Store/authSlice"; // store user in redux

const API_URL = "http://localhost:5000/api/auth";

const AuthCard = ({ open, onClose, isSignup, setIsSignup }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await axios.post(`${API_URL}/signup`, formData);
        setIsSignup(false); // switch to login after signup
      } else {
        const res = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });
        dispatch(loginSuccess(res.data)); // save user + token in redux
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignup ? "Sign Up" : "Login"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width={300}>
          {isSignup && (
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
          )}
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "grey.300",
                color: "black",
              },
            }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>

          {!isSignup && (
            <Typography
              variant="body2"
              sx={{ mt: 1, cursor: "pointer", color: "blue" }}
              onClick={() => setIsSignup(true)}
            >
              New User? Sign up
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthCard;
