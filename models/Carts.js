const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "product" },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
