import { Request, Response } from "express";
import { connection as knex } from "../database/connection";

export class ItemsController {
  //* INDEX Route - list all items
  index = async (_: Request, res: Response) => {
    const items = await knex("items").select("*");

    return res.status(200).json(items);
  };
}
