import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
<<<<<<< HEAD
  isConfirmed: { type: Boolean, required: false },
  numberOfSeatsBooked: { type: Number, required: false },
  seatIds: [{ type: Number, required: false }], // Array of bookedseat numbers. reserved ones.
  date: { type: String, required: false },
=======
  isConfirmed:{type:Boolean,required: false},
  numberOfSeatsBooked: { type: Number, required: false },
  seatIds: [{ type: String, required: false }], // Array of seat numbers
  date: { type: Date, required: false },
>>>>>>> f46d34c414e689eb7b8afb14e5f89599008430b6
});

export default mongoose.model("Booking", bookingSchema);
