module.exports = (app) => {
  const packageNetworks = require("../../../controllers/packageNetwork.controller.js");

  // Create a new packageNetwork
  app.post("/api/v1/packageNetworks", packageNetworks.create);

  // Retrieve all packageNetworks
  app.get("/api/v1/packageNetworks", packageNetworks.findAll);

  // Retrieve a single packageNetwork with id
  app.get("/api/v1/packageNetworks/:id", packageNetworks.findOne);

  // Update a packageNetwork with id
  app.put("/api/v1/packageNetworks/:id", packageNetworks.update);

  // Delete a packageNetwork with id
  app.delete("/api/v1/packageNetworks/:id", packageNetworks.delete);

  // Delete all packageNetworks
  app.delete("/api/v1/packageNetworks", packageNetworks.deleteAll);
};
