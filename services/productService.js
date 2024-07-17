const db = require("../models");
const product = db.Product;
async function insertProduct(productCreate) {
  try {
    const newProduct = await product.create(productCreate);
    return newProduct;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getProductById(id) {
  try {
    const productOne = await product.findByPk(id);
    return productOne ? { productOne, statusCode: 200 } : { statusCode: 404 };
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getProductAll() {
  try {
    const productFindAll = await product.findAll();
    return productFindAll;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function deleteProduct(id) {
  try {
    console.log("id: ", id);
    const productDelete = await product.destroy({
      where: {
        productId: id,
      },
    });
    if (productDelete > 0) {
      return { message: "Product deleted successfully", statusCode: 204 };
    }
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function updateProduct(id, product) {
  try {
    let productExists = await Product.findByPk(id);
    if (!productExists) {
      throw new Error(`Product with id ${id} not found.`);
    }
    if (product.name !== undefined) {
      productExists.name = product.name;
    }
    if (product.price !== undefined) {
      productExists.price = product.price;
    }
    if (product.website !== undefined) {
      productExists.website = product.website;
    }
    await productExists.save();
    return productExists;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

module.exports = {
  insertProduct,
  getProductById,
  getProductAll,
  deleteProduct,
  updateProduct,
};
