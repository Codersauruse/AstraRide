import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid", "Failed"],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["DebitCard", "CreditCard", "Cash"],
    required: false,
  },
  paymentDate: { type: String, required: false },
});

export default mongoose.model("Payment", paymentSchema);
