import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  arrivalTime: { type: Date, required: true },
  departureTime: { type: Date, required: true },
  destination: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Bus", busSchema);
