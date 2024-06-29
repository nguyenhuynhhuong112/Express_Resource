const { insertProduct } = require("../../services/productService");

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

module.exports = {
  createProduct,
};
