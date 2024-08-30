const router = require("express")();
const initializeConnections = require("../config/intializeConnection.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let productConnection;

// initializeConnections()
//   .then((connections) => {
//     // console.log(connections, "connection");
//     productConnection = connections.productCollection;
//   })
//   .catch((error) => {
//     console.error("Failed to initialize database connections:", error);
//   });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res, next) => {
  try {
    let productList = await productConnection.find({}).toArray();
    res.status(200).send(productList);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/add", upload.single("image"), async (req, res, next) => {
  try {
    const {
      productName,
      buyingPrice,
      productCategory,
      quantity,
      unit,
      expiryDate,
      threshOldValue,
    } = req.body;
    // const imageUrl = req.file ? req.file.path : null;
    const imageUrl = req.file
      ? `http://localhost:2000/${req.file.path.replace(/\\/g, "/")}`
      : null;
    console.log(imageUrl, "Image Url");
    let productId = uuidv4();
    const Product = {
      productName,
      productId,
      buyingPrice,
      productCategory,
      quantity,
      unit,
      // expiryDate,
      threshOldValue,
      // imageUrl: imageUrl,
      // createdAt: new Date(),
    };
    try {
      console.log(Product);
      const result = await productConnection.insertOne(Product);
      console.log(result);
    } catch (err) {
      console.log(err, "err");
      res.send(err);
    }
    res.status(200).send("inserted successfully");
  } catch (err) {}
});

router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    const {
      productName,
      buyingPrice,
      productCategory,
      quantity,
      unit,
      expiryDate,
      threshOldValue,
    } = req.body;
    console.log(req.body);
    // const imageUrl = req.file ? req.file.path : null;
    const imageUrl = req.file
      ? `http://localhost:2000/${req.file.path.replace(/\\/g, "/")}`
      : null;
    const productId = req.params.id;
    if (!productId) {
      res.status(400).send({ message: "Product id is required" });
    }
    const updatedProduct = {
      productName,
      buyingPrice,
      productCategory,
      quantity,
      unit,
      // expiryDate,
      threshOldValue,
      // imageUrl: imageUrl,
      // updatedAt: new Date(),
    };
    const result = await productConnection.updateOne(
      { productId: productId },
      { $set: updatedProduct }
    );
    if (result.modifiedCount == 0) {
      return res
        .status(404)
        .send({ message: "Product not found or no changes made" });
    }
    res.status(200).send("product updated successfully");
  } catch (err) {
    res.status(500).send({ message: "error while updating Product detials" });
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    let result = productConnection.deleteOne({ productId: req.params.id });
    if (result) {
      res.status(200).send({ message: "product deleted successfully" });
    } else {
      res.status(404).send({ message: "No Product Registered" });
    }
  } catch (err) {
    res.status(500).send({ message: `error while deleting product` });
  }
});

module.exports = router;
