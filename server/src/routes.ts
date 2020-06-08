import express from "express";
import multer from "multer";
import path from "path";
import { celebrate, Joi } from "celebrate";

import multerConfig from "./config/multer";

//* import controllers
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

const router = express.Router();

//* new instances of controllers
const pointController = new PointsController();
const itemsController = new ItemsController();

const upload = multer(multerConfig);

//* ==========
//*   ROUTES
//* ==========

//* items INDEX
router.get("/items", itemsController.index);

//* points CREATE
router.post(
  "/points",
  upload.single("img"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        wpp: Joi.number().required(),
        lat: Joi.number().required(),
        long: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().max(2).required(),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  pointController.create
);

//* points INDEX with query
router.get("/points", pointController.index);

//* points SHOW
router.get("/points/:id", pointController.show);

export default router;
