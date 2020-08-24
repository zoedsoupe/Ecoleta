import { App } from "./app";

const app = new App().express;

const port = 3333 || Number(`${process.env.PORT}`);
const host = "localhost" || process.env.IP;

app.listen(port, host, () => console.log("Ecoleta API started!"));
