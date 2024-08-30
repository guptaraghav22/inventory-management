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

router.get("/", (req, res, next) => {
  res.send("This works 1");
});

router.post("/add", (req, res, next) => {
  res.send("This works 2");
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
