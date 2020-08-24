import express from "express";
import cors from "cors";
import path from "path";
import { errors } from "celebrate";

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
    this.express.use(
      "/uploads",
      express.static(path.resolve(__dirname, "uploads"))
    );
  }
}
