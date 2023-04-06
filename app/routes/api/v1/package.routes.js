module.exports = (app) => {
  const packages = require("../../../controllers/package.controller.js");

  // Create a new package
  app.post("/api/v1/packages", packages.create);

  // Retrieve all packages
  app.get("/api/v1/packages", packages.findAll);

  // Retrieve a single package with id
  app.get("/api/v1/packages/:id", packages.findOne);

  // Update a package with id
  app.put("/api/v1/packages/:id", packages.update);

  // Delete a package with id
  app.delete("/api/v1/packages/:id", packages.delete);

  // Delete all packages
  app.delete("/api/v1/packages", packages.deleteAll);
};
