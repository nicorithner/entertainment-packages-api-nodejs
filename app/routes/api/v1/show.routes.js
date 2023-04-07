module.exports = (app) => {
  const shows = require("../../../controllers/show.controller.js");

  // Create a new show
  app.post("/api/v1/shows", shows.create);

  // Retrieve all shows
  app.get("/api/v1/shows", shows.findAll);

  // Retrieve a single show with id
  app.get("/api/v1/shows/:id", shows.findOne);

  // Update a show with id
  app.put("/api/v1/shows/:id", shows.update);

  // Delete a show with id
  app.delete("/api/v1/shows/:id", shows.delete);

  // Delete all shows
  app.delete("/api/v1/shows", shows.deleteAll);
};
