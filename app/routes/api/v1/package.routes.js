module.exports = (app) => {
  const packages = require("../../../controllers/package.controller.js");

  /**
   * @swagger
   * components:
   *   schemas:
   *     Package:
   *       type: object
   *       required:
   *         - name
   *         - price
   *       properties:
   *         id:
   *           type: number
   *           description: Package primary key
   *         name:
   *           type: string
   *           description: Name of the package
   *         price:
   *           type: number
   *           description: Name of the package
   *         createdAt:
   *           type: string
   *           format: date
   *           description: The date the package was added
   *         updatedAt:
   *           type: string
   *           format: date
   *           description: The date the package was added
   *       example:
   *         id: 1
   *         name: Basic,
   *         price: 9.9,
   *         createdAt: 2023-04-15T03:17:31.601Z
   *         updatedAt: 2023-04-15T03:17:31.601Z
   */

  /**
   * @swagger
   * tags:
   *   name: Packages
   *   description: Packages API
   * /api/v1/packages:
   *   get:
   *     summary: Lists of packages
   *     tags: [Packages]
   *     responses:
   *       200:
   *         description: List all packages
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Package'
   *   post:
   *     summary: Create a package
   *     tags: [Packages]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Package'
   *     responses:
   *       200:
   *         description: Creates a package.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Package'
   *       500:
   *         description: Some server error
   *     deleteAll:
   *           summary: Remove all packages
   *           tags: [Packages]
   *           responses:
   *             200:
   *               description: <number of packages> Packages were deleted successfully!
   *             500:
   *               description: Some error occurred while removing all packages.
   * /api/v1/packages/{id}:
   *   get:
   *     summary: Get the package by id
   *     tags: [Packages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The package id
   *     responses:
   *       200:
   *         description: The package response by id
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Package'
   *       500:
   *         description: Cannot find package with id=<package id>
   *   put:
   *    summary: Update the package by the id
   *    tags: [Packages]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The package id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Package'
   *    responses:
   *      200:
   *        description: The package was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Package'
   *      500:
   *        description: Something went wrong while updating package with id=<package id>
   *   delete:
   *     summary: Remove the package by id
   *     tags: [Packages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The package id
   *
   *     responses:
   *       200:
   *         description: Package was deleted successfully!
   *       500:
   *         description: Couldn't detele package with id=$<package id>
   */

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
