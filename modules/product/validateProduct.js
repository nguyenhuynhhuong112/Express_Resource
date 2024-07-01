const validator = require("validator");

function validateProduct(req, res, next) {
  const { name, price, website } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ message: "name is required." });
  }
  if (!price ||  price < 0) {
    errors.push({ message: "price is required." });
  }
  if (!website || !validator.isURL(website)) {
    errors.push({ message: "website is required." });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}

function validateUpdateProduct(req, res, next) {
  const { name, price, website } = req.body;
  let errors = [];
  if (name && typeof name !== "string") {
    errors.push({ message: "name must be a string." });
  }
  if (price && (!validator.isNumeric(price) || price < 0)) {
    errors.push({ message: "price is required." });
  }
  if (website && !validator.isURL(website)) {
    errors.push({ message: "website is required." });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}

module.exports = {
  validateProduct,
  validateUpdateProduct,
};
