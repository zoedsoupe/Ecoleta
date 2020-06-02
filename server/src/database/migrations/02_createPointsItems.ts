import Knex from "knex";

//* function to create the table
export const up = async (knex: Knex) => {
  return knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();
    table.integer("point_id").notNullable().references("id").inTable("points");
    table.integer("item_id").notNullable().references("id").inTable("items");
  });
};

//* drop the table
export const down = async (knex: Knex) => {
  return knex.schema.dropTable("point_items");
};
