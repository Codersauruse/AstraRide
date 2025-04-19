import express from "express";
import {
  getAllBuses,
  addBus,
  updateBus,
  deleteBus,
  getBus,
} from "../controller/busController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const busRouter = express.Router();

busRouter.get("/get-all-buses", getAllBuses);
busRouter.get("/getBus/:busId", getBus);
busRouter.post("/addBus", authMiddleware("admin"), addBus);
busRouter.patch("/updateBus/:busId", authMiddleware("admin"), updateBus);
busRouter.delete("/deleteBus/:busId", authMiddleware("admin"), deleteBus);

export default busRouter;
