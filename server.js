const express = require("express");
const dotenv = require("dotenv");
let connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Running on port 2000");
});
