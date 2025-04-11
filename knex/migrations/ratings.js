 
exports.up = function (knex) {
  return knex.schema.createTable("Rating", (table) => {
    table.increments("id").primary();

    table.integer("userId").notNullable();
    table.string("buildingId").notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("User")
      .onDelete("CASCADE"); //probably going to have to use foreign key here
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
    table.integer("dining_hall_proximity");
    table.integer("ac_proximity");
    table.integer("public_bathrooms");
    table.integer("public_kitchens");
    table.integer("elevators");
    table.integer("laundry");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Rating");
};
