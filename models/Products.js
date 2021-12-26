const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  Title: { type: String, required: true },
  ImagePath: { type: String, required: true },
  discPrice: { type: Number, required: true },
  Price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
