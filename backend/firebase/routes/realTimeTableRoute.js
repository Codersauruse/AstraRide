import express from "express";
import { getAvailableBuses } from "../controllers/getRealtimeTableController.js";
//import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-all-buses", getAvailableBuses);
// busRouter.get("/getBus/:busId", getBus);
// busRouter.post("/addBus", authMiddleware("admin"), addBus);
// busRouter.patch("/updateBus/:busId", authMiddleware("admin"), updateBus);
// busRouter.delete("/deleteBus/:busId", authMiddleware("admin"), deleteBus);

export default router;
