module.exports = (app) => {
  const networks = require("../../../controllers/network.controller.js");

  // Create a new network
  app.post("/api/v1/networks", networks.create);

  // Retrieve all networks
  app.get("/api/v1/networks", networks.findAll);

  // Retrieve a single network with id
  app.get("/api/v1/networks/:id", networks.findOne);

  // Update a network with id
  app.put("/api/v1/networks/:id", networks.update);

  // Delete a network with id
  app.delete("/api/v1/networks/:id", networks.delete);

  // Delete all networks
  app.delete("/api/v1/networks", networks.deleteAll);
};
