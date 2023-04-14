const db = require("../models");
const Network = db.Network;
const Package = db.Package;
const packagesJSON = require("./data/packages.json");

async function getPackageNetworks() {
  const packageNetworksObjects = [];
  const networkIds = {};
  const packageIds = {};
  const packageAndNetworks = [];

  // -- Create NetworkIds dictionary

  const networks = await Network.findAll();

  for (const network of networks) {
    networkIds[network.name] = network.id;
  }

  // -- Create PackageIds dictionary

  const packages = await Package.findAll();

  for (const package of packages) {
    packageIds[package.name] = package.id;
  }

  for (const package of packagesJSON) {
    packageAndNetworks.push(
      ...package.networks.map((net) => [
        networkIds[net],
        packageIds[package.name],
      ])
    );
  }

  // ---- Create packageNetworks

  let count = 1;
  for (const pair of packageAndNetworks) {
    packageNetworksObjects.push({
      id: count,
      NetworkId: pair[0],
      PackageId: pair[1],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    count += 1;
  }
  return packageNetworksObjects;
}
getPackageNetworks();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "PackageNetworks",
      await getPackageNetworks(),
      {}
    );
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("PackageNetworks", null, {});
  },
};
