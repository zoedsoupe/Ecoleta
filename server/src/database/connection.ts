import knex from "knex";
import path from "path";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
});

//* Entidades = {
//*   points: Pontos de coleta {
//*     name, img, email, wpp, latidude, longitude, city, uf, num
//*   }
//*   items: items para coleta {
//*     title, img
//*   }
//*   point_items: relacionamento (N-N) dos points e items {
//*      point_id, item_id
//*   }
//* }

export default connection;

//* Migrations são um controle de versão do esu banco de dados
