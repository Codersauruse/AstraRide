import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seatNumbers: { type: [Number], required: true, default: [0] },
  status: {
    type: String,
    enum: ["Available", "Reserved"],
    default: "Available",
  },
  date: { type: Date, required: false },
});

export default mongoose.model("Seat", seatSchema);
