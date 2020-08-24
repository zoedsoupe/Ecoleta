import { Request, Response } from "express";
import { connection as knex } from "../database/connection";

export class ItemsController {
  //* INDEX Route - list all items
  index = async (_: Request, res: Response) => {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://${process.env.IP}/uploads/${item.img}`,
      };
    });

    return res.status(200).json(serializedItems);
  };
}
