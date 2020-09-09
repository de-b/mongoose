const ProductController = require('./product.controller');
const Authenticate = require('../../middlewares/authentication');

const router = require('express').Router();

router
  .route('/')
  .get(Authenticate, ProductController.get)
  .post(Authenticate, ProductController.insert);

router
  .route('/search')
  .get(ProductController.search)
  .post(ProductController.search);

module.exports = router;
