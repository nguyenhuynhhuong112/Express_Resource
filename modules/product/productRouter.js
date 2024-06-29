const express = require("express");
const router = express.Router();
const productController = require("./productController");
router.post("/create-product", productController.createProduct);
module.exports = router;
