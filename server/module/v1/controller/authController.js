const { sendResponse, serverErrorResponse } = require("../../../configs/common");
const { general } = require("../../../language/en.json");
const userService = require("../service/userService");
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

/**
 * Login API
 */
const login = async (req, res, next) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, errors.array()[0].msg, null);
    }
    try {
        let { email, password } = req.body;

        const condition = {
            email: email,
            is_deleted: false,
            is_active: true
        }
        const attributes = ["id", "username", "password", "email"];

        const userDetails = await userService.userDetails(condition, attributes);
        if (!userDetails) {
            return sendResponse(res, 403, false, general.userNotFound, null);
        };

        const passwordCompare = await bcrypt.compare(password, userDetails.password)
        if (!passwordCompare) {
            return sendResponse(res, 401, false, general.incorrectPassword, null);
        };

        const userWithToken = await userService.UserWithToken(userDetails);
        return sendResponse(res, 200, true, general.userLoginSuccess, userWithToken);

    } catch (error) {
        return serverErrorResponse(res, error.message);
    }
};

/**
 * User logout API
 */
const logout = async (req, res) => {
    res.send("logout")
};

/**
 * Signup API
 */
const signup = async (req, res, next) => {

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, errors.array()[0].msg, null);
    }
    try {
        let { username, email, password } = req.body;

        let condition = { email: email };
        let attributes = ['id', 'username', 'email'];

        // Check if the user already exists
        const exitsUser = await userService.userDetails(condition, attributes);
        if (exitsUser) {
            return sendResponse(res, 403, false, general.already_exists, null);
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObj = {
            username: username,
            email: email,
            password: hashedPassword
        };
        // Save the user with the hashed password
        const createUser = await userService.userCreate(userObj);
        return sendResponse(res, 200, true, general.signed_success, createUser.email);

    } catch (error) {
        return serverErrorResponse(res, error.message);
    };
};

/**
 * User Profile API
 */
const profile = async (req, res) => {
    res.send("profile")
};

module.exports = {
    login: login,
    logout: logout,
    signup: signup,
    profile: profile
};