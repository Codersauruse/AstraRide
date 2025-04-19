import express from "express";
import {
  addToRealTimeBookings,
  getAllRealTimeBookings,
} from "../controllers/RealtimeBookingController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const RealtImebookingRouter = express.Router();

RealtImebookingRouter.post(
  "/save-to-real-timebooking",
  authMiddleware("user"),
  addToRealTimeBookings
);
RealtImebookingRouter.get(
  "/get-all-bookings/:id",
  authMiddleware("user"),
  getAllRealTimeBookings
);

export default RealtImebookingRouter;
