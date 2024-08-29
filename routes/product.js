const router = require("express")();
const initializeConnections = require("../config/intializeConnection.js");
const multer = require("multer");
let productConnection;

initializeConnections()
  .then((connections) => {
    // console.log(connections, "connection");
    productConnection = connections.productCollection;
  })
  .catch((error) => {
    console.error("Failed to initialize database connections:", error);
  });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", (req, res, next) => {
  res.send("This works 1");
});

router.post("/add", upload.single("image"), async (req, res, next) => {
  try {
    const {
      productName,
      productId,
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
    const Product = {
      productName,
      productId,
      buyingPrice,
      productCategory,
      quantity,
      unit,
      expiryDate,
      threshOldValue,
      imageUrl: imageUrl,
      createdAt: new Date(),
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

router.put("/:id", (req, res, next) => {
  console.log("PARAMS: ", req.params);
  res.send("This works 3");
});

router.delete("/:id", (req, res, next) => {
  console.log("PARAMS: ", req.params);
  res.send("This works 4");
});

module.exports = router;
