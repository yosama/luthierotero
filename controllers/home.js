"use strict";

const db = require('../models');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  
  db.Product.find({},{productId:1, name:1, pictures:1, model:1})
    .then((products) =>{
      res.render('index', { products });
    })
    .catch((err) => {
      console.log(err);
    })
  
};