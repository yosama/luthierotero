"use strict";

const mongoose = require("mongoose");
const fx = require("../utils/fx");

const productSchema = mongoose.Schema({
  name: { type: String },
  model: { type: String },
  description: { type: String, maxLength: 160 },
  author: { type: String },
  year: { type: Number },
  state: { type: String },
  pictures: [{ type: String,  match: /^http:\/\//i}],
  price: {
    amount: {
      type: Number,
      required: true,
      set: function(value) {
        this.internal.approximatePriceUSD = value / ( fx()[this.price.currency] || 1);
        return value;
      }
    },
    // Only 3 supported currencies for now
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      required: true,
      set: function(v) {
        this.internal.approximatePriceUSD =
          this.price.amount / (fx()[v] || 1);
        return v;
      }
    }
  },
  internal: {
    approximatePriceUSD: Number
  },
  category: {
    type: String
  }
}, { timestamps: true });


/*
 * Human-readable string form of price - "$25" rather
 * than "25 USD"
 */
productSchema.virtual("displayPrice").get(function() {
  return currencySymbols[this.price.currency] + "" + this.price.amount;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;