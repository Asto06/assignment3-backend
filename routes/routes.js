const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const Product = require("../models/Products");
const Cart = require("../models/Carts");
const routes = express.Router();

routes.post("/register", async (req, res) => {
  try {
    const { email, password, firstname, lastname, telephone, city } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const result = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstname,
      lastname,
      telephone,
      city,
    });
    res.status(200).json({ message: "User Berhasil Dibuat!", result });
  } catch (error) {
    res.status(401).json({ message: "User Gagal Dibuat!" });
  }
});

routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email: email.toLowerCase() });
    if (!result) {
      res.status(404).json({ message: "User Not Found!" });
    }
    const checkPass = bcrypt.compareSync(password, result.password);
    if (!checkPass) {
      res.status(400).json({ message: "Password Wrong!" });
    }
    const token = jwt.sign({ id: result.id, email: result.email }, "ini secret key", {
      expiresIn: 86400,
    });
    res.status(200).json({ message: "Login Berhasil!", data: result, token: token });
  } catch (error) {
    console.log(error);
  }
});

routes.post("/product/create", async (req, res) => {
  try {
    const { Title, ImagePath, discPrice, Price, description } = req.body;
    const result = await Product.create({ Title, ImagePath, discPrice: parseInt(discPrice), Price: parseInt(Price), description });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

routes.get("/product", async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

routes.post("/cart/create", async (req, res) => {
  try {
    const { product, user } = req.body;
    const result = await Cart.create({ product, user });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

routes.get("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Cart.find({ user: id }).populate("product");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

routes.delete("/cart/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Cart.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
