import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  arrivalTime: { type: String, required: true }, // Store as "HH:mm"
  departureTime: { type: String, required: true }, // Store as "HH:mm"
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  isWorking: { type: Boolean, required: true },
  date: { type: String, required: true }, // Store as "yyyy-mm-dd" (this stores the bus which is not working that day. when it happen is working becomes false)
});

export default mongoose.model("Bus", busSchema);
