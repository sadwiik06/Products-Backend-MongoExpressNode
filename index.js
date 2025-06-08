const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.js");
app.use(express.json());
require("dotenv").config();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("hello world");
});
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});
app.get("/api/products/:id", async (Request, res) => {
  try {
    
    const product = await Product.findById(Request.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});
app.put("/api/products/:id", async (req, res) => {
  try {
    const {id}=req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conencted to DB"))
  .catch(() => console.log("Error connecting db"));
