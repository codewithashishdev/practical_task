const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");
const { signupValidation, loginValidation } = require('../validation/validation');
const { verifyJWTToken } = require('../middleware/middleware');

router.post("/login", loginValidation, authController.login);

router.post("/logout", authController.logout);

router.post("/signup", signupValidation, authController.signup);


// profile user
router.get("/profile", verifyJWTToken, authController.profile)

module.exports = router;