import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  //* INDEX Route - list all items
  index = async (_: Request, res: Response) => {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.105:3333/uploads/${item.img}`,
      };
    });

    return res.json(serializedItems);
  };
}

export default ItemsController;
