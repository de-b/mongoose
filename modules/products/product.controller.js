const ProductQuery = require('./product.query');

function get(req, res, next) {
  const condition = {};
  ProductQuery.find(condition);
}

function getById(req, res, next) {
  const condition = { _id: req.params.id };
  ProductQuery.find(condition);
}

function insert(req, res, next) {
  //data preparation
  const data = req.body;
  ProductQuery.save(data)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
}

function update(req, res, next) {}

function remove(req, res, next) {}

function search(req, res, next) {
  const searchCondition = {}; //searchCondition
  ProductQuery.find(searchCondition);
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  search,
};
