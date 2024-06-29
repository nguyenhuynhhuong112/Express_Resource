const { Product } = require("../models");

async function insertProduct(product) {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

module.exports = {
  insertProduct,
};
