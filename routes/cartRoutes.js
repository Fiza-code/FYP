import express from "express";
import Cart from "../model/Cart.js";
import Product from "../model/Product.js";

const router = express.Router();

// ------------------ GET CART ------------------
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) return res.json({ userId, products: [] });

    const products = cart.items
      .filter((item) => item.product) // skip null products
      .map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));

    res.json({ userId, products });
  } catch (err) {
    console.error("Cart fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------ ADD TO CART ------------------
router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId)
      return res.status(400).json({ error: "userId & productId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ product: productId, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) cart.items[itemIndex].quantity += 1;
      else cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    await cart.populate("items.product");

    const products = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));

    res.json({ userId, products });
  } catch (err) {
    console.error("Cart add error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------ UPDATE QUANTITY ------------------
router.put("/update", async (req, res) => {
  try {
    const { userId, productId, action } = req.body;
    if (!userId || !productId || !action)
      return res
        .status(400)
        .json({ error: "userId, productId & action required" });

    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product && item.product._id.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ error: "Product not in cart" });

    if (action === "increase") cart.items[itemIndex].quantity += 1;
    else if (action === "decrease") {
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) cart.items.splice(itemIndex, 1);
    } else return res.status(400).json({ error: "Invalid action" });

    await cart.save();

    const products = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));

    res.json({ userId, products });
  } catch (err) {
    console.error("Cart update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------ DELETE PRODUCT ------------------
router.delete("/delete/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId)
      return res.status(400).json({ error: "userId & productId required" });

    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product && item.product._id.toString() !== productId
    );

    await cart.save();

    const products = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));

    res.json({ userId, products });
  } catch (err) {
    console.error("Cart delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
