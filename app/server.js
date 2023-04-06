const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "node_express_api_dev",
  "postgres",
  "postgres",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// express
const app = express();

// db
const db = require("./db/models");
//db.sequelize.sync(); // commented while using force: true to reset every time.

// In development, you may need to drop existing tables and re-sync database.
// Just use force: true as following code:
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//--- middlewares
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// cors
const corsOptions = {
  origin: [process.env.CLIENT_URL],
};
app.use(cors(corsOptions));

// morgan
app.use(morgan("dev"));

// routes
app.get("/", async (_req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  res.status(200).send({ message: "Hello, World!, with sequelize" });
});

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
