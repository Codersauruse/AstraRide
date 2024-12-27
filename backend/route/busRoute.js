import express from "express";
import {
  getAllBuses,
  addBus,
  updateBus,
  deleteBus,
} from "../controller/busController.js";
import adminAuth from "../middleware/adminAuth.js";

const busRouter = express.Router();

busRouter.get("/get-all-buses", getAllBuses);
busRouter.post("/addBus", adminAuth, addBus);
busRouter.patch("/updateBus/:busId", adminAuth, updateBus);
busRouter.delete("/deleteBus/:busId", adminAuth, deleteBus);

export default busRouter;
