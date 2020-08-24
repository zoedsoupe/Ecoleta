import Knex from "knex";

//* function to create the table
export const up = async (knex: Knex) => {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.string("img").notNullable();
    table.string("title").notNullable();
  });
};

//* drop the table
export const down = async (knex: Knex) => {
  return knex.schema.dropTable("items");
};
