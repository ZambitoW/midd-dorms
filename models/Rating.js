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
      required: [],

      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        buildingId: { type: "string" },
        room_type: { type: "string" },
        storage_space: { type: "integer", minimum: 0, maximum: 5 },
        clean: { type: "integer", minimum: 0, maximum: 5 },
        size: { type: "integer", minimum: 0, maximum: 5 },
        noise: { type: "integer", minimum: 0, maximum: 5 },
        dining_hall_proximity: { type: "integer", minimum: 0, maximum: 5 },
        ac_proximity: { type: "integer", minimum: 0, maximum: 5 },
        public_bathrooms: { type: "integer", minimum: 0, maximum: 5 },
        public_kitchens: { type: "integer", minimum: 0, maximum: 5 },
        laundry: { type: "integer", minimum: 0, maximum: 5 },
        comment: { type: "string" },
        created_at: { type: "string", format: "date-time" },
      },
    };
  }
}
