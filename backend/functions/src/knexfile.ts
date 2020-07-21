import path from "path";

//! Knex do not support ES6 modules
//* knex config file to exec the migrations and seed to the database
module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "database", "seeds"),
  },
  useNullAsDefault: true,
};
