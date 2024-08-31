const router = require("express")();
const initializeConnections = require("../config/intializeConnection.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let orderConnection;

initializeConnections()
  .then((connections) => {
    orderConnection = connections.orderCollection;
    console.log("connection", orderConnection);
  })
  .catch((error) => {
    console.error("Failed to initialize database connections:", error);
  });

router.get("/", async (req, res, next) => {
  try {
    let result = await orderConnection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "error while fetching order" });
    }
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
});

router.post("/add", async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
  let {
    newOrderProduct,
    contractorProductId,
    productCategory,
    newOrderValue,
    newOrderUnit,
    newOrderBuyingPrice,
    newOrderDOD,
  } = req.body;
  console.log(req.body);
  let createdAt = new Date();
  let orderId = uuidv4();
  let updatedOrder = {
    newOrderProduct,
    contractorProductId,
    productCategory,
    newOrderValue,
    newOrderBuyingPrice,
    newOrderUnit,
    newOrderDOD,
    createdAt,
  };
  let result = await orderConnection.insertOne(updatedOrder);
  if (result) {
    res.status(200).send(updatedOrder);
  } else {
    res.status(404).send({ message: "error while adding order" });
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
