const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  imgUrls: { type: Array, required: true },
  title: { type: String, required: true, minlength: 3 },
  desc: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true, min: 0 },
  color: { type: String, required: true },
  sizes: { type: Array, required: true },
});

module.exports = mongoose.model("product", ProductSchema);
