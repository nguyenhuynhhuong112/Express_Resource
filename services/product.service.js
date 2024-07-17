const db = require("../models");
const Product = db.Product;
const { sequelize } = require("../models");
const { Op } = require("sequelize");

async function createProductService(product) {
  const transaction = await sequelize.transaction();
  try {
    const createProduct = await Product.create(product, { transaction });
    await transaction.commit();
    return { result: createProduct, statusCode: 201 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getProductByIdService(id, transaction) {
  try {
    const product = await Product.findByPk(id, { transaction });
    if (product) {
      return { result: { exists: true, product }, statusCode: 200 };
    } else {
      return { result: { exists: false }, statusCode: 404 };
    }
  } catch (error) {
    throw { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getAllProductsService() {
  const transaction = await sequelize.transaction();
  try {
    const products = await Product.findAll({ transaction });
    await transaction.commit();
    return { result: products, statusCode: 200 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function deleteProductService(id) {
  const transaction = await sequelize.transaction();
  try {
    await Product.destroy({ where: { productId: id }, transaction });
    await transaction.commit();
    return { result: "Product deleted successfully", statusCode: 200 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function updateProductService(id, updateData, transaction) {
  try {
    const [numberOfAffectedRows] = await Product.update(updateData, {
      where: { productId: id },
      transaction,
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Update failed");
    }
    return { message: "Product updated successfully", statusCode: 200 };
  } catch (error) {
    throw { error: error.message, statusCode: error.statusCode || 500 };
  }
}
module.exports = {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getAllProductsService,
  updateProductService,
};
