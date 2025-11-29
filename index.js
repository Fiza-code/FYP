import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// ✅ Route imports
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/upload.js";
import orderRoutes from "./routes/orderRoutes.js";

// // ✅ Models
// import Cart from "./model/Cart.js";
// import Order from "./model/Order.js";
// import Product from "./model/Product.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ----------------- MIDDLEWARE ----------------- */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/upload", uploadRoutes);

/* ----------------- DATABASE ----------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ----------------- ROUTES ----------------- */
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

/* ----------------- DEFAULT ROUTE ----------------- */
app.get("/", (req, res) => {
  res.send("🛍️ E-commerce API is running...");
});

/* ----------------- SERVER ----------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
