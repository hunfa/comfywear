const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
  },
  stuff: {
    type: String,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "none",
  },
  variantStatus: {
    type: String,
    required: true,
  },
  variant: [],
});
mongoose.models = {};
module.exports = mongoose.model("product", productSchema);
