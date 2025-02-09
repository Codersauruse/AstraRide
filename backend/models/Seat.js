import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
<<<<<<< HEAD
  seatNumbers: { type: [Number], required: true, default: [0] },
=======
  seatNumber: { type: [String], required: true },
>>>>>>> f46d34c414e689eb7b8afb14e5f89599008430b6
  status: {
    type: String,
    enum: ["Available", "Reserved"],
    default: "Available",
  },
<<<<<<< HEAD
  date: { type: Date, required: false },
=======
>>>>>>> f46d34c414e689eb7b8afb14e5f89599008430b6
});

export default mongoose.model("Seat", seatSchema);
