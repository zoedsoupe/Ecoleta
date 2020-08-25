import { App } from "./app";

const app = new App().express;

const port = Number(`${process.env.PORT}`) || 3333;
const host = process.env.IP || "localhost";

app.listen(port, host, () => console.log("Ecoleta API started!"));
