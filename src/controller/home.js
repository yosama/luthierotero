
const db = require('../model');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  const query = { deleted: { $exists: false } };
  db.Product.find(query, {
    productId: 1, name: 1, pictures: 1, model: 1
  })
    .then((products) => {
      res.render('index', { products });
    })
    .catch((err) => {
      console.log(err);
    });
};
