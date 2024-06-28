const validator = require("validator");

function validateUser(req, res, next) {
  const { userName, email, password, roleId } = req.body;
  let errors = [];

  if (!userName) {
    errors.push({ message: "userName is required." });
  }

  if (!email || !validator.isEmail(email)) {
    errors.push({ message: "Valid email is required." });
  } else if (!email.endsWith("@gmail.com")) {
    errors.push({ message: "Email must end with @gmail.com." });
  }

  if (!password || password.length < 8) {
    errors.push({ message: "Password must be at least 8 characters long." });
  }

  if (!roleId) {
    errors.push({ message: "Role ID is required." });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = {
  validateUser,
};
