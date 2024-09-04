const jwt = require("jsonwebtoken");

const contant = require("../../../configs/constant");
const { sendResponse } = require("../../../configs/common");
const { auth, general } = require("../../../language/en.json");

const verifyJWTToken = async (req, res, next) => {
    let token = req.header("Authorization");
    // let token  = req.session.token
    if (!token) {
        return sendResponse(res, 403, true, general.missing_jwt_token, null);
    }
    token = req.header("Authorization").split(" ")[1];
    if (!token) {
        return sendResponse(res, 403, true, general.missing_jwt_token, null);
    }

    const varify = await jwt.decode(token, contant.SECRETE);
    if (!varify) {
        return sendResponse(res, 403, false, general.failed, null);
    }
    req.user = varify;
    next();
};

module.exports = {
    verifyJWTToken
}