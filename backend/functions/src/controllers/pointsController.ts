import { Request, Response } from "express";
import knex from "../database/connection";

class PointsControler {
  //* INDEX route - query points
  index = async (req: Request, res: Response) => {
    const { city, uf, items } = req.query;

    //* convert items to a array without "," or " "
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    //* SELECT DISTINCT * FROM points JOIN point_items ON points.id = point_items.point_id \
    //* WHERE point_items.item_id IN {parsedItems} WHERE city = {city} WHERE uf = {uf}
    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.0.105:3333/uploads/${point.img}`,
      };
    });

    return res.json(serializedPoints);
  };

  //* SHOW route - show specific point information
  show = async (req: Request, res: Response) => {
    const { id } = req.params;

    //* SELECT * points WHERE id = {id} LIMIT 1
    const point = await knex("points").where("id", id).first();

    if (!point) return res.status(400).json({ message: "Point not found" });

    //* SELECT * FROM items JOIN point_items ON items.id = point_items.item_id WHERE point_items.item_id = {id}
    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.105:3333/uploads/${point.img}`,
    };

    return res.json({ point: serializedPoint, items });
  };

  //* CREATE route - add a new point to the database
  create = async (req: Request, res: Response) => {
    try {
      const { name, email, wpp, lat, long, city, uf, items } = req.body;

      //* add a knex transaction to avoid database queries errors
      const trx = await knex.transaction();

      const point = {
        img: req.file.filename,
        name,
        email,
        wpp,
        lat,
        long,
        city,
        uf,
      };

      //* save point to the database

      const insertedIds = await trx("points").insert(point);

      const pointId = insertedIds[0];

      const pointItems = items
        .split(",")
        .map((item: string) => parseInt(item.trim(), 10))
        .map((item_id: number) => {
          return {
            item_id,
            point_id: pointId,
          };
        });

      //* save the point_id and [item_id] to the point_items table
      await trx("point_items").insert(pointItems);

      await trx.commit();

      return res.json({
        id: pointId,
        ...point,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(500).json(err.message);
    }
  };
}

export default PointsControler;
