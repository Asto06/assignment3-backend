const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    telephone: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
