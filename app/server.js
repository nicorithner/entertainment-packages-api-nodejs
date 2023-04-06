const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// express
const app = express();

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
app.get("/", (_req, res) => {
  res.status(200).send({ message: "Hello, World!" });
});

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
