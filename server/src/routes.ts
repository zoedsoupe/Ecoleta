import express from "express";

import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

const router = express.Router();

const pointController = new PointsController();
const itemsController = new ItemsController();

router.get("/items", itemsController.index);

router.post("/points", pointController.create);

router.get("/points", pointController.index);

router.get("/points/:id", pointController.show);


export default router;
