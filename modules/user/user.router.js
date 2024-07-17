const express = require("express");
const router = express.Router();

const controller = require("./user.controller");
const validate = require("./user.validate");

// post
router.post("/create-user", validate.validateUser, controller.createUser);
router.post("/login", controller.userLogin);

// get
router.get("/get-one-user/:id", controller.getOneUser);
router.get("/get-all-users", controller.getAllUser);

// delete
router.delete("/delete-user/:id", controller.deleteUser);

// patch
router.patch("/update-user/:id", controller.updateUser);
module.exports = router;
