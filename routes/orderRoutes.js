import express from "express";
import Order from "../model/Order.js";

const router = express.Router();

// ✅ CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { customer, paymentMethod, items } = req.body;

    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
      return res.status(400).json({ error: "All customer fields are required" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const normalizedItems = items.map((item) => ({
      productId: item._id || item.productId || null,
      name: item.name || "Unnamed Product",
      image: item.image || "",
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    }));

    const totalAmount = normalizedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const newOrder = new Order({
      customer,
      paymentMethod: paymentMethod || "COD",
      items: normalizedItems,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders); // returns array of orders
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
