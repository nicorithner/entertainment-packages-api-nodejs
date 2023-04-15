module.exports = (app) => {
  const shows = require("../../../controllers/show.controller.js");

  /**
   * @swagger
   * components:
   *   schemas:
   *     Show:
   *       type: object
   *       required:
   *         - name
   *         - price
   *       properties:
   *         id:
   *           type: number
   *           description: Show primary key
   *         name:
   *           type: string
   *           description: Name of the show
   *         price:
   *           type: number
   *           description: Name of the show
   *         createdAt:
   *           type: string
   *           format: date
   *           description: The date the show was added
   *         updatedAt:
   *           type: string
   *           format: date
   *           description: The date the show was added
   *       example:
   *         id: 1
   *         title: American Idol,
   *         imdb_rating: 4.1,
   */

  /**
   * @swagger
   * tags:
   *   name: Shows
   *   description: Shows API
   * /api/v1/shows:
   *   get:
   *     summary: Lists of shows
   *     tags: [Shows]
   *     responses:
   *       200:
   *         description: List all shows
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Show'
   *   post:
   *     summary: Create a show
   *     tags: [Shows]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Show'
   *     responses:
   *       200:
   *         description: Creates a show.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Show'
   *       500:
   *         description: Some server error
   *     deleteAll:
   *           summary: Remove all shows
   *           tags: [Shows]
   *           responses:
   *             200:
   *               description: <number of shows> Shows were deleted successfully!
   *             500:
   *               description: Some error occurred while removing all shows.
   * /api/v1/shows/{id}:
   *   get:
   *     summary: Get the show by id
   *     tags: [Shows]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The show id
   *     responses:
   *       200:
   *         description: The show response by id
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Show'
   *       500:
   *         description: Cannot find show with id=<show id>
   *   put:
   *    summary: Update the show by the id
   *    tags: [Shows]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The show id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Show'
   *    responses:
   *      200:
   *        description: The show was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Show'
   *      500:
   *        description: Something went wrong while updating show with id=<show id>
   *   delete:
   *     summary: Remove the show by id
   *     tags: [Shows]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The show id
   *
   *     responses:
   *       200:
   *         description: Show was deleted successfully!
   *       500:
   *         description: Couldn't detele show with id=$<show id>
   */

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
