import express from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("Listagem de usuários");

  res.json(["Diego", "Robson", "Cleyton"]);
});

app.listen(3333, () => console.log("Ecoleta started!"));
