const ProductModel = require('./product.model');

function save(data) {
  return new Promise(resolve, (reject) => {
    var newProduct = new ProductModel({});
    //map data in newProduct

    newProduct.save(err, (done) => {
      if (err) {
        reject(err);
      } else {
        resolve(done);
      }
    });
  });
}

function find(condition) {
  ProductModel.find(condition).exec();
}

function update(id, data) {}

function remove(id) {}

module.exports = {
  save,
  find,
  update,
  remove,
};
