import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "General" },
    type: { type: String, default: "" }, // optional
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    sold: { type: Number, default: 0 },
    delivered: { type: Boolean, default: false }, // ✅ new field
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

