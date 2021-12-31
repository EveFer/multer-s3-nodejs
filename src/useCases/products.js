const Product = require('../models/products')

function create (data) {
  return Product.create(data)
}

function updateById (id, data) {
  // data = {image: "url"}
  return Product.findByIdAndUpdate(id, data, { new: true })
}

function get (price) {
  return Product.find({ price: { $gt: price } })
}

module.exports = {
  create,
  updateById
}
