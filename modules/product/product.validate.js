const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("productName")
    .notEmpty()
    .withMessage("productName is required.")
    .isString()
    .withMessage("productName must be a string."),
  body("price")
    .notEmpty()
    .withMessage("price is required.")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number."),
  body("website")
    .notEmpty()
    .withMessage("website is required.")
    .isURL()
    .withMessage("website must be a valid URL."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateProduct = [
  body("name").optional().isString().withMessage("name must be a string."),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number."),
  body("website")
    .optional()
    .isURL()
    .withMessage("website must be a valid URL."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateProduct,
  validateUpdateProduct,
};
