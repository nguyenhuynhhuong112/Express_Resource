const {
  insertProduct,
  getProductById,
  getProductAll,
  deleteProduct
} = require("../../services/productService");

async function createProduct(req, res) {
  const { name, price, website } = req.body;
  try {
    const newProduct = await insertProduct({ name, price, website });
    if (newProduct.error) {
      const statusCode = newProduct.statusCode || 500;
      return res.status(statusCode).json({ error: newProduct.error });
    }
    return res
      .status(200)
      .json({ message: "Create Product Successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOneProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (product.error) {
      const statusCode = product.statusCode || 500;
      return res.status(statusCode).json({ error: product.error });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function findAllProduct(req, res) {
  try {
    const product = await getProductAll();
    if (product.error) {
      const statusCode = product.statusCode || 500;
      return res.status(statusCode).json({ error: product.error });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function removeProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    if (product.error) {
      const statusCode = product.statusCode || 500;
      return res.status(statusCode).json({ error: product.error });
    }
    return res.status(200).json({ message: product.message });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  createProduct,
  getOneProduct,
  findAllProduct,
  removeProduct
};
