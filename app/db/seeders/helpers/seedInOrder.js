#!/usr/bin/env node

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const baseUrl = "npx sequelize db:seed --seed app/db/seeders/";
async function seedInOrder() {
  try {
    // seed networks first
    const { stdout, stderr } = await exec(
      `${baseUrl}20230411164737-seed-networks.js`
    );
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
  try {
    // seed shows second
    const { stdout, stderr } = await exec(
      `${baseUrl}20230411171616-seed-shows.js`
    );
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
  try {
    // seed packages third
    const { stdout, stderr } = await exec(
      `${baseUrl}20230412210539-seed-packages.js`
    );
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
  try {
    // seed packageNetworks last
    const { stdout, stderr } = await exec(
      `${baseUrl}20230412213046-seed-packageNetworks.js`
    );
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}
seedInOrder();
