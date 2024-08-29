// const express = require("express");
// const dotenv = require("dotenv");
// const routes = require("./routes");
// const router = express.Router();
// const app = express();
// dotenv.config();
// const PORT = process.env.PORT;

// app.use(express.json());
// // JSON parser middleware
// router.use(bodyParser.json());

// // Form data parser middleware
// router.use(bodyParser.urlencoded({ extended: true }));

// app.use("/uploads", express.static("uploads"));
// app.use("/", routes);

// app.listen(PORT, () => {
//   console.log(`Server Running on PORT: ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const bodyParser = require("body-parser"); // Import body-parser
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

// JSON parser middleware
app.use(bodyParser.json());

// Form data parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
