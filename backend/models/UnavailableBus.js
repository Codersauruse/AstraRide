import mongoose from "mongoose";

const UnavailablebusSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },

  message: { type: String, required: true },

  date: { type: [String], required: false }, // Can store a single date or multiple dates as strings
});

export default mongoose.model("UnavailableBus", UnavailablebusSchema);
