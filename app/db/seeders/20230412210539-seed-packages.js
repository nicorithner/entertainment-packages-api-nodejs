const packages = require("./data/packages.json");
const packagesObjects = [];
let count = 1;
for (const package of packages) {
  packagesObjects.push({
    id: count,
    name: package.name,
    price: package.price,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  count += 1;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("Packages", packagesObjects, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Packages", null, {});
  },
};
