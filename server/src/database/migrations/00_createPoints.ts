import Knex from "knex";

export const up = async (knex: Knex) => {
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary();
    table.string("img").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("wpp").notNullable();
    table.decimal("lat").notNullable();
    table.decimal("long").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable("point");
};
