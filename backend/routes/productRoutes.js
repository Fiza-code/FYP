import express from "express";
import Product from "../model/Product.js";

const router = express.Router();

/* ----------------- LATEST PRODUCTS ----------------- */
router.get("/latest", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    const currentDate = new Date();

    const updatedProducts = products.map((product) => {
      const createdAt = new Date(product.createdAt);
      const isNew = (currentDate - createdAt) / (1000 * 60 * 60 * 24) <= 7; // 7 days
      return { ...product.toObject(), isNew };
    });

    res.status(200).json(updatedProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
});

/* ----------------- BEST SELLERS ----------------- */
router.get("/best-sellers", async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ sold: -1 }).limit(5);
    res.status(200).json(bestSellers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch best sellers" });
  }
});

/* ----------------- FILTERS ----------------- */
router.get("/filters", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const types = await Product.distinct("type");
    res.status(200).json({ categories, types });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch filters" });
  }
});

/* ----------------- RELATED PRODUCTS ----------------- */
router.get("/related/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    }).limit(4);

    res.status(200).json(relatedProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});

/* ----------------- ALL PRODUCTS ----------------- */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------- SINGLE PRODUCT ----------------- */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

/* ----------------- PATCH (EDIT PRODUCT) ----------------- */
router.patch("/:id", async (req, res) => {
  try {
    const updatedData = req.body; // e.g., price, category, delivered
    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------- DELETE PRODUCT ----------------- */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create product (POST /api/products)
router.post("/", async (req, res) => {
  try {
    const { name, price, description, stars, category, type, isNew, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ msg: "Name, price and image are required" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stars,
      category,
      type,
      isNew,
      image,
    });

    await newProduct.save();
    return res.status(201).json({ msg: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Add product error:", err);
    return res.status(500).json({ msg: "Failed to add product" });
  }
});

export default router;

