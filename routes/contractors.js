const router = require("express")();
const initializeConnections = require("../config/intializeConnection.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let contractorConnections;

initializeConnections()
  .then((connections) => {
    contractorConnections = connections.contractorCollection;
  })
  .catch((error) => {
    console.error("Failed to initialize database connections:", error);
  });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/contractor");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res, next) => {
  try {
    let result = await contractorConnections.findOne({});

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "Error while getting contractor list" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/add", upload.single("image"), async (req, res, next) => {
  try {
    let { supplierName, product, contractorNumber, email, type, onTheWay } =
      req.body;

    let contractorId = uuidv4();
    const imageUrl = req.file
      ? `http://localhost:2000/${req.file.path.replace(/\\/g, "/")}`
      : null;
    let updatedContractor = {
      supplierName,
      product,
      contractorNumber,
      email,
      type,
      onTheWay,
      contractorId,
      // imageUrl,
    };

    let result = await contractorConnections.insertOne(updatedContractor);

    if (result) {
      res.status(200).send({ result });
    } else {
      res
        .status(404)
        .send({ message: "Some error occured while posting contractor" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server" });
  }
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
