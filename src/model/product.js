
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  instrumentsId: { type: Number },
  name: { type: String },
  model: { type: String },
  description: { type: String, maxLength: 160 },
  author: { type: String },
  year: { type: Number },
  state: { type: String },
  pictures: [{ type: String }],
  category: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Instrument', ProductSchema);

module.exports = Product;
