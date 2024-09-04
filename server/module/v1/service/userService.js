const constant = require("../../../configs/constant");
const jwt = require("jsonwebtoken");
const db = require("../models/index");


const userDetails = async (condition, attributes = "") => {
    const user = await db.tbl_user.findOne(
        {
            where: condition,
            attributes: attributes,
            nest: true,
            raw: true
        },
    );
    if (!user) {
        return false;
    };
    return user;
};

const userCreate = async (data) => {
    const user = await db.tbl_user.create(data);
    return user;
};

const UserWithToken = async (user) => {
    const token = await jwt.sign(
        {
          id: user.id,
          name: user.username,
          email: user.email,
        },
        constant.SECREATE,
        {
          expiresIn: constant.EXP
        });
    
      user.password = undefined;
      user.token = token;
      return user;
};

module.exports = {
    userDetails: userDetails,
    userCreate: userCreate,
    UserWithToken: UserWithToken
};