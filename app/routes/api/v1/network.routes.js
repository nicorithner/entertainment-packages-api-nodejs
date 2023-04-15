module.exports = (app) => {
  const networks = require("../../../controllers/network.controller.js");

  /**
   * @swagger
   * components:
   *   schemas:
   *     Network:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         id:
   *           type: number
   *           description: Network primary key
   *         name:
   *           type: string
   *           description: Name of the network
   *         createdAt:
   *           type: string
   *           format: date
   *           description: The date the network was added
   *         updatedAt:
   *           type: string
   *           format: date
   *           description: The date the network was added
   *       example:
   *         id: 1
   *         name: CBS
   *         createdAt: 2023-04-15T03:17:31.601Z
   *         updatedAt: 2023-04-15T03:17:31.601Z
   */

  /**
   * @swagger
   * tags:
   *   name: Networks
   *   description: Networks API
   * /api/v1/networks:
   *   get:
   *     summary: Lists of networks
   *     tags: [Networks]
   *     responses:
   *       200:
   *         description: List all networks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Network'
   *   post:
   *     summary: Create a network
   *     tags: [Networks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Network'
   *     responses:
   *       200:
   *         description: Creates a network.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Network'
   *       500:
   *         description: Some server error
   *     deleteAll:
   *           summary: Remove all networks
   *           tags: [Networks]
   *           responses:
   *             200:
   *               description: <number of networks> Networks were deleted successfully!
   *             500:
   *               description: Some error occurred while removing all networks.
   * /api/v1/networks/{id}:
   *   get:
   *     summary: Get the network by id
   *     tags: [Networks]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The network id
   *     responses:
   *       200:
   *         description: The network response by id
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Network'
   *       500:
   *         description: Cannot find network with id=<network id>
   *   put:
   *    summary: Update the network by the id
   *    tags: [Networks]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The network id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Network'
   *    responses:
   *      200:
   *        description: The network was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Network'
   *      500:
   *        description: Something went wrong while updating network with id=<network id>
   *   delete:
   *     summary: Remove the network by id
   *     tags: [Networks]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The network id
   *
   *     responses:
   *       200:
   *         description: Network was deleted successfully!
   *       500:
   *         description: Couldn't detele network with id=$<network id>
   */

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
