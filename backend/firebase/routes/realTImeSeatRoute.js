import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { getAllreservedSeats } from "../controllers/RealTimeSeatController.js";

const RealtimeSeatRouter = express.Router();

RealtimeSeatRouter.get(
  "/get-all-reservedseats/:busId",
  authMiddleware("user"),
  getAllreservedSeats
);

export default RealtimeSeatRouter;
