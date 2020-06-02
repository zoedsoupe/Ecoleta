import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes";

const app = express();

//* add cross origin resource sharing
app.use(cors());

//* parse requests to json
app.use(express.json());

//* serve staticlly the upload folder
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(routes);

app.listen(3333, () => console.log("Ecoleta started!"));
