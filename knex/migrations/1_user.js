exports.up = function (knex) {
  return knex.schema.createTable("User", (table) => {
    table.increments("id").primary();
    table.string("googleId");
    table.string("firstName");
    table.string("lastName");
    table.text("email");
    table.integer("classYear");
    table.boolean("complete");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("User");
};
