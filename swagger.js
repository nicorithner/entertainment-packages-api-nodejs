const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Charter-Spectrum Entertainment API",
      version: "1.0.0",
      description:
        "This API serves endpoints to entertainment packages with their networks and shows",
    },
  },
  apis: ["./app/routes/api/v1/*.routes.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};
