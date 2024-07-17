const { body, validationResult } = require("express-validator");

const validateUser = [
  body("userName").notEmpty().withMessage("userName is required."),
  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .custom((value) => value.endsWith("@gmail.com"))
    .withMessage("Email must end with @gmail.com."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("roleId").notEmpty().withMessage("Role ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserUpdate = [
  body("userName")
    .optional()
    .isString()
    .withMessage("Username must be a string."),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required.")
    .custom((value) => value.endsWith("@gmail.com"))
    .withMessage("Email must end with @gmail.com."),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUser,
  validateUserUpdate,
};
