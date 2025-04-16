/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/rating.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("Rating")
    .del()
    .then(() => knex.batchInsert("Rating", data, 100));
};
