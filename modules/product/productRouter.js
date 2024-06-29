const express = require("express");
const router = express.Router();
const productController = require("./productController");
router.post("/create-product", productController.createProduct);
router.get("/product/:id", productController.getOneProduct);
router.get("/product", productController.findAllProduct);
router.delete("/product/:id", productController.removeProduct);
module.exports = router;
