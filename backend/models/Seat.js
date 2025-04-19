import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seatNumber: { type: [String], required: true },
  status: {
    type: String,
    enum: ["Available", "Reserved"],
    default: "Available",
  },
  date: { type: Date, required: false },
});

export default mongoose.model("Seat", seatSchema);
