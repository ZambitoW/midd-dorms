import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "User";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: [],

      properties: {
        id: { type: "integer" },
        googleId: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        classYear: { type: "integer" },
      },
    };
  }

  // Override this method to exclude googleId
  $formatJson(json) {
    const formattedJson = super.$formatJson(json);
    delete formattedJson.googleId;
    return formattedJson;
  }
}
