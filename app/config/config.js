const fs = require("fs");

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "node_express_api_dev",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.CI_DB_USERNAME || "postgres",
    password: process.env.CI_DB_PASSWORD || "postgres",
    database: process.env.CI_DB_NAME || "node_express_api_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: "postgres",
  },
};
