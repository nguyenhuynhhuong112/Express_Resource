const express = require("express");
const router = express.Router();

const controller = require("./product.controller");
const validate = require("./product.validate");

// post
router.post(
  "/create-product",
  validate.validateProduct,
  controller.createProduct
);

// get
router.get("/get-one-product/:id", controller.getProductOne);
router.get("/get-all-products", controller.getAllProduct);

// delete
router.delete("/delete-product/:id", controller.deleteProduct);

// patch
router.patch(
  "/update-product/:id",
  validate.validateUpdateProduct,
  controller.updateProduct
);
module.exports = router;
