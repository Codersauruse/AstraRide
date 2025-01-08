import express from "express";
import {
  confirmBooking,
  deleteBooking,
  getAllBookings,
  addToBookings,
  getOneBooking,
} from "../controller/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.get(
  "/get-all-bookings/:id",
  authMiddleware("user"),
  getAllBookings
);
bookingRouter.post("/confirmBooking", authMiddleware("user"), confirmBooking);
bookingRouter.delete("/delete", authMiddleware("user"), deleteBooking);
bookingRouter.post("/saveBooking", authMiddleware("user"), addToBookings);
bookingRouter.get(
  "/getOneBooking/:bookingId",
  authMiddleware("user"),
  getOneBooking
);

export default bookingRouter;
