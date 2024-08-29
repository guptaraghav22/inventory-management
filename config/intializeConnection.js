const connectDB = require("./connectDB.js");
const { MongoClient } = require("mongodb");

const initializeConnections = async () => {
  const client = await connectDB();
  const db = client.db("InventoryManagemet");

  const userCollection = db.collection("users");
  const contractorCollection = db.collection("contractor");
  const productCollection = db.collection("product");
  const orderCollection = db.collection("order");

  return {
    userCollection,
    productCollection,
    orderCollection,
    contractorCollection,
  };
};

module.exports = initializeConnections;
