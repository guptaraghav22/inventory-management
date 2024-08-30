const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
