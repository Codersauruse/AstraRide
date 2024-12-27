import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  numberOfSeatsBooked: { type: Number, required: true },
  seatIds: [{ type: String, required: true }], // Array of seat numbers
  date: { type: Date, required: true },
});

export default mongoose.model("Booking", bookingSchema);
