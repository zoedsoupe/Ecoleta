import knex from "knex";
import path from "path";

//* create a connection to the database and create the file
const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});


export default connection;
