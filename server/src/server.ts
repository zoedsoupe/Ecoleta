import express from "express";
import routes from "./routes"

const app = express();

app.use(express.json());
app.use(routes)

//* Rota: endereço completo da requisição
//* Recurso: qual a entendidade estamos acessando do sistema

//* Request Params: parâmetros que vem na própria rota, obrigatŕio
//* Query Params: parâmetros que vem na rota, geralmente opcionais, para paginação e filtros
//* Request Body: parâmetros para criação/atualização de informaçõe

app.listen(3333, () => console.log("Ecoleta started!"));
