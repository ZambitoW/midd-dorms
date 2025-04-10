
exports.up = function (knex) {
    return knex.schema.createTable("Rating", (table) => {
      table.increments("id").primary();
      table.string("student"); //probably going to have to use foreign key here
      table.string("room"); //probably going to have to use foreign key here as well
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
