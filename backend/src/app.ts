import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { errors } from "celebrate";

import { router } from "./routes";

export class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(errors());
    this.express.use(express.json());
    this.express.use(router);
    this.express.use(morgan("dev"));
    this.express.use(
      "/uploads",
      express.static(path.resolve(__dirname, "uploads"))
    );
  }
}
