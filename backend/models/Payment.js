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
    enum: ["Pending", "Completed", "Failed"],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["DebitCard", "CreditCard", "Cash"],
    required: true,
  },
  paymentDate: { type: Date, required: true },
});

export default mongoose.model("Payment", paymentSchema);
