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

async function getProductAll() {
  try {
    const product = await Product.findAll();
    return product;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function deleteProduct(id) {
  try {
    const product = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (product > 0) {
      return { message: "Product deleted successfully", statusCode: 204 };
    } else {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}
module.exports = {
  insertProduct,
  getProductById,
  getProductAll,
  deleteProduct,
};
