import express from "express";

const app = express();

app.use(express.json());

//* Rota: endereço completo da requisição
//* Recurso: qual a entendidade estamos acessando do sistema

//* Request Params: parâmetros que vem na própria rota, obrigatŕio
//* Query Params: parâmetros que vem na rota, geralmente opcionais, para paginação e filtros
//* Request Body: parâmetros para criação/atualização de informações

const users = ["Diego", "Robson", "Cleyton", "Daniel"];

app.get("/users", (req, res) => {
  const search = String(req.query.search);

  const filteredUsers = search
    ? users.filter((user) => user.includes(search))
    : users;

  return res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users[id];

  return res.json(user);
});

app.post("/users", (req, res) => {
  const data = req.body;

  const user = data;

  return res.json(user);
});

app.listen(3333, () => console.log("Ecoleta started!"));
