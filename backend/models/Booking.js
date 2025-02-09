import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isConfirmed: { type: Boolean, required: false },
  numberOfSeatsBooked: { type: Number, required: false },
  seatIds: [{ type: Number, required: false }], // Array of bookedseat numbers. reserved ones.
  date: { type: String, required: false },
});

export default mongoose.model("Booking", bookingSchema);
