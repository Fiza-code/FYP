// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../Store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [preview, setPreview] = useState(user?.image ? `http://localhost:5000${user.image}` : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setImage(user?.image || "");
    setPreview(user?.image ? `http://localhost:5000${user.image}` : null);
  }, [user]);

  // handle image change & preview
  const handleImageChange = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload/profile-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setImage(res.data.imageUrl);
      setPreview(`http://localhost:5000${res.data.imageUrl}`);
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // handle save
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/update-user/${user.id}`,
        { name, email, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // update redux store
      dispatch(loginSuccess({ user: res.data.user, token }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
        pt: 10,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Profile
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <label htmlFor="profile-image-upload">
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            <Avatar
              src={preview}
              alt="Profile"
              sx={{ width: 100, height: 100, cursor: "pointer" }}
            />
          </label>
        </Box>

        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
