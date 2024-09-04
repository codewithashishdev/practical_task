const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");
const { signupValidation, loginValidation } = require('../validation/validation');

router.post("/login", loginValidation, authController.login);

router.post("/logout", authController.logout);

router.post("/signup", signupValidation, authController.signup);


// profile user
router.post("/profile", authController.profile)

module.exports = router;