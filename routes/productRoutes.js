const express = require("express");
const router = express.Router();
const { addProduct } = require("../controllers/productController.js");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-product", upload.single("image"), addProduct);

module.exports = router;
