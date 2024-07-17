const { sequelize } = require("../../models");
const service = require("../../services/product.service");

async function createProduct(req, res) {
  const transaction = await sequelize.transaction();
  const { productName, price, website, type } = req.body;
  try {
    if (!productName || !price || !website || !type) {
      return res
        .status(400)
        .json({ error: "Missing required fields", statusCode: 400 });
    }
    if (price < 0) {
      return res
        .status(400)
        .json({ error: "Price must be greater than 0", statusCode: 400 });
    }
    const createProduct = await service.createProductService(
      req.body,
      transaction
    );
    await transaction.commit();
    return res.status(createProduct.statusCode).send(createProduct);
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  const transaction = await sequelize.transaction();
  const { id } = req.params;
  try {
    const productExists = await service.getProductByIdService(id, transaction);
    if (!productExists.result.exists) {
      return res
        .status(404)
        .json({ error: "Product not found", statusCode: 404 });
    }
    const deleteProduct = await service.deleteProductService(id, transaction);
    await transaction.commit();
    return res.status(deleteProduct.statusCode).send(deleteProduct);
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function getProductOne(req, res) {
  const transaction = await sequelize.transaction();
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing required fields", statusCode: 400 });
    }
    const productExists = await service.getProductByIdService(id, transaction);
    if (!productExists.result.exists) {
      return res
        .status(404)
        .json({ error: "Product not found", statusCode: 404 });
    } else {
      await transaction.commit();
      return res.status(productExists.statusCode).send(productExists);
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function getAllProduct(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const products = await service.getAllProductsService(transaction);
    await transaction.commit();
    return res.status(products.statusCode).send(products);
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
    const transaction = await sequelize.transaction();
    const { id } = req.params;
    try {
      const productExists = await service.getProductByIdService(id, transaction);
  
      if (!productExists.result.exists) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ error: "Product not found", statusCode: 404 });
      }
  
      const updateData = {};
      if (req.body.productName && req.body.productName !== productExists.result.product.productName) {
        updateData.productName = req.body.productName;
      }
      if (req.body.price && req.body.price !== productExists.result.product.price) {
        updateData.price = req.body.price;
      }
      if (req.body.website && req.body.website !== productExists.result.product.website) {
        updateData.website = req.body.website;
      }
      if (req.body.type && req.body.type !== productExists.result.product.type) {
        updateData.type = req.body.type;
      }
  
      if (Object.keys(updateData).length > 0) {
        const updateResult = await service.updateProductService(id, updateData, transaction);
        if (updateResult.error) {
          throw new Error(updateResult.error);
        }
        await transaction.commit();
        return res.status(200).json({ message: "Product updated successfully" });
      } else {
        await transaction.rollback();
        return res
          .status(400)
          .json({ error: "No fields to update", statusCode: 400 });
      }
    } catch (error) {
      await transaction.rollback();
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

module.exports = {
  createProduct,
  deleteProduct,
  getProductOne,
  getAllProduct,
  updateProduct,
};
