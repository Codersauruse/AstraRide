import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isConfirmed:{type:Boolean,required: false},
  numberOfSeatsBooked: { type: Number, required: false },
  seatIds: [{ type: String, required: false }], // Array of seat numbers
  date: { type: Date, required: false },
});

export default mongoose.model("Booking", bookingSchema);
