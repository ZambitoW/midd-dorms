exports.up = function (knex) {
  return knex.schema.createTable("Building", (table) => {
    table.string("id").primary();
    table.string("name");
    table.string("category"); // For what class
    table.text("description");
    table.specificType("roomTypes", "text[]");
    table.specificType("amenities", "text[]");
    table.boolean("wheelchairAccessible");
    table.specificType("proximity", "jsonb");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Building");
};
