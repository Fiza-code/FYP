// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecretKey";

// auth middleware for protected routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ msg: "Something went wrong in signup", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      msg: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, image: user.image || "" },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ msg: "Something went wrong in login", error: err.message });
  }
});

// Get current user (protected)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error("Get me error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// Update user (protected) -> PUT /api/auth/update-user/:id
router.put("/update-user/:id", authMiddleware, async (req, res) => {
  try {
    const targetId = req.params.id;
    // allow only the same user to update
    if (req.user.id !== targetId) return res.status(403).json({ msg: "Not authorized" });

    const { name, email, password, image } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (image) updateData.image = image;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(targetId, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    return res.json({
      msg: "Profile updated successfully",
      user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, image: updatedUser.image || "" },
    });
  } catch (err) {
    console.error("update-user error:", err);
    return res.status(500).json({ msg: "Something went wrong updating user" });
  }
});

// Delete user (protected) -> DELETE /api/auth/delete-user/:id
router.delete("/delete-user/:id", authMiddleware, async (req, res) => {
  try {
    const targetId = req.params.id;
    if (req.user.id !== targetId) return res.status(403).json({ msg: "Not authorized" });

    await User.findByIdAndDelete(targetId);
    return res.json({ msg: "Account deleted successfully" });
  } catch (err) {
    console.error("delete-user error:", err);
    return res.status(500).json({ msg: "Failed to delete account" });
  }
});

export default router;
