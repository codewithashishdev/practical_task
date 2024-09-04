require("dotenv").config()

module.exports ={

    PORT : process.env.URL_PORT,
    //database details
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db_host: {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DBPORT,
        schema: process.env.DB_SCHEMA,
        logging: process.env.LOGGING
    },

    EXP: process.env.EXP,
    SECRETE: process.env.SECRETE,

};