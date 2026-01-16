// backend/routes/upload.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

// POST /upload/profile-image
// field name: image
router.post("/profile-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
    const imageUrl = `/uploads/${req.file.filename}`; // static served at /uploads
    return res.json({ imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ msg: "Upload failed" });
  }
});
// POST /upload/product-image
router.post("/product-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const imageUrl = `/uploads/${req.file.filename}`;
    return res.json({ imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ msg: "Upload failed" });
  }
});


export default router;
