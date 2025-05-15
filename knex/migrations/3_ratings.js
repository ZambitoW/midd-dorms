exports.up = function (knex) {
  return knex.schema.createTable("Rating", (table) => {
    table.increments("id").primary();
    table.integer("userId").notNullable();
    table.string("buildingId").notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("User")
      .onDelete("CASCADE");
    table
      .foreign("buildingId")
      .references("id")
      .inTable("Building")
      .onDelete("CASCADE");

    table.string("room_type");
    //************Room Specific****************
    table.integer("storage_space");
    table.integer("size");
    table.integer("noise");
    //************Building Specific****************
    table.integer("clean");
    table.integer("dining_hall_proximity");
    table.integer("ac_proximity");
    table.integer("public_bathrooms");
    table.integer("public_kitchens");
    table.integer("laundry");
    table.text("comment");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Rating");
};
