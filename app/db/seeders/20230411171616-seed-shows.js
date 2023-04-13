"use strict";
const db = require("../models");
const Network = db.Network;

// process provided data
const showsJSON = require("./data/shows.json");

async function getShows() {
  const showsObjects = [];
  const networkIds = {};

  const networks = await Network.findAll();

  for (const network of networks) {
    networkIds[network.name] = network.id;
  }

  for (const show of showsJSON) {
    showsObjects.push({
      title: show.title,
      NetworkId: networkIds[show.network],
      imdb_rating: show.imdbRating,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return showsObjects;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("Shows", await getShows(), {});
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Shows", null, {});
  },
};
