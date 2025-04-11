import BaseModel from "./BaseModel";

export default class Rating extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Rating";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["room", "student"],

      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        buildingId: { type: "string" },
        room_type: { type: "string" },
        storage_space: { type: "integer", minimum: 1, maximum: 10 },
        size: { type: "integer", minimum: 1, maximum: 10 },
        noise: { type: "integer", minimum: 1, maximum: 10 },
        dining_hall_proximity: { type: "integer", minimum: 1, maximum: 10 },
        ac_proximity: { type: "integer", minimum: 1, maximum: 10 },
        public_bathrooms: { type: "integer", minimum: 1, maximum: 10 },
        public_kitchens: { type: "integer", minimum: 1, maximum: 10 },
        elevators: { type: "integer", minimum: 1, maximum: 10 },
        laundry: { type: "integer", minimum: 1, maximum: 10 },
      },
    };
  }
}
