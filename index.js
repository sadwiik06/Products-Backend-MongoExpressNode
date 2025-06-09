const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.js");
const productRoutes = require("./routes/productroutes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("hello world");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Error connecting db"));
