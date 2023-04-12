"use strict";
const networks = require("./data/networks.json");
const networksObjects = [];
let count = 1;
for (const network of networks) {
  networksObjects.push({
    id: count,
    name: network.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  count += 1;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("Networks", networksObjects, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Networks", null, {});
  },
};
