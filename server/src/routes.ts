import express from "express";

//* import controllers
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

const router = express.Router();

//* new instances of controllers
const pointController = new PointsController();
const itemsController = new ItemsController();


//* ==========
//*   ROUTES
//* ==========

//* items INDEX
router.get("/items", itemsController.index);

//* points CREATE
router.post("/points", pointController.create);

//* points INDEX with query
router.get("/points", pointController.index);

//* points SHOW
router.get("/points/:id", pointController.show);


export default router;
