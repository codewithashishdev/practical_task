const { general } = require("../language/en.json")

const sendResponse = async (res, statusCode, status, message, data = null) => {
    const resObj = {
        status: status,
        status_code: statusCode,
        message: message,
        data: data,
    };

    return res.status(200).send(resObj);
};

const serverErrorResponse = async (res, data = {}) => {
    console.log(data)
    return res.status(500).send({
        status: false,
        status_code: 500,
        message: general.server_error,
        errors: data
    });
};


module.exports = {
    sendResponse,
    serverErrorResponse,
};