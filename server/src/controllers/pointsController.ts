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

    return res.json(points);
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

    return res.json({ point, items });
  };

  //* CREATE route - add a new point to the database
  create = async (req: Request, res: Response) => {
    const { name, email, wpp, lat, long, city, uf, items } = req.body;

    //* add a knex transaction to avoid database queries errors
    const trx = await knex.transaction();

    const point = {
      img:
        "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
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

    const pointItems = items.map((item_id: number) => {
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
  };
}

export default PointsControler;
