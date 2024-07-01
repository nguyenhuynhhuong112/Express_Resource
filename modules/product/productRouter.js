const express = require("express");
const router = express.Router();
const productController = require("./productController");
const { validateProduct, validateUpdateProduct } = require("./validateProduct");
router.post(
  "/create-product",
  validateProduct,
  productController.createProduct
);
router.get("/product/:id", productController.getOneProduct);
router.get("/product", productController.findAllProduct);
router.delete("/product/:id", productController.removeProduct);
router.patch(
  "/product/:id",
  validateUpdateProduct,
  productController.updateProductById
);
module.exports = router;
