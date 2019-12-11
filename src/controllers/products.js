
const db = require('../models');

exports.getProducts = (req, res, next) => {
  db.Product.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
};

exports.createProduct = (req, res, next) => {
  db.Product.create(req.body)
    .then((productCreated) => {
      res.status(201).json(productCreated);
    })
    .catch((err) => {
      next({ status: 400, message: err.message });
    });
};

exports.getProduct = (req, res, next) => {
  db.Product.findById(req.params.productId)
    .then((productFounded) => {
      res.status(200).json(productFounded);
    })
    .catch((err) => {
      next({ status: 400, message: err.message });
    });
};

exports.updateProduct = (req, res, next) => {
  req.body.hasOwnProperty('price')
    ? (() => {
      db.Product.findById(req.params.productId)
        .then((productFounded) => {
          productFounded.price.amount = req.body.price.amount;
          productFounded.save();
          return productFounded;
        }).then((productUpdated) => {
          res.status(200).json(productUpdated);
        })
        .catch((err) => {
          next({ status: 400, message: err.message });
        });
    })()
    : (() => {
      db.Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
        .then((productUpdated) => {
          res.status(200).json(productUpdated);
        })
        .catch((err) => {
          next({ status: 400, message: err.message });
        });
    })();
};

exports.deleteProduct = (req, res, next) => {
  db.Product.remove({ _id: req.params.productId })
    .then(() => {
      res.status(200).json({ message: 'We deleted it' });
    })
    .catch((err) => {
      next({ status: 400, message: err.message });
    });
};
