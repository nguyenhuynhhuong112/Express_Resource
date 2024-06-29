const { Product } = require("../models");

async function insertProduct(product) {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getProductById(id) {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getProductAll(){
  try {
    const product = await Product.findAll();
    return product;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}
module.exports = {
  insertProduct,
  getProductById,
  getProductAll
};
