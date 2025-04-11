import BaseModel from "./BaseModel";

export default class Building extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Building";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "category"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        category: { type: "string" },
        description: { type: "string" }, //It doesnt look like objection recognizes text as a type
        roomType: { type: "array", items: { type: "string" } },
        amenities: { type: "array", items: { type: "string" } },
        accessibility: { type: "array", items: { type: "string" } },
        proximity: { type: "object" },
      },
    };
  }
}
