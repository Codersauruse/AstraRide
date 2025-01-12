import Bus from "../models/Bus.js";
import mongoose from "mongoose";
import UnavailableBus from "../models/UnavailableBus.js";

const getAllBuses = async (req, res) => {
  try {
    const { destination } = req.query; // Get the destination from query parameters

    // Fetch buses based on the destination
    const buses = destination
      ? await Bus.find({ destination })
      : await Bus.find();

    // Fetch unavailable buses
    const unavailableBuses = await UnavailableBus.find();

    // Create a Set of unavailable bus IDs for efficient lookup

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // Create a Set of unavailable bus IDs for efficient lookup
    const unavailableBusIds = new Set(
      unavailableBuses
        .filter((bus) => bus.date.includes(formattedDate)) // Only include buses with today's date
        .map((bus) => bus.busId.toString()) // Map to busId strings
    );

    // Filter available buses
    const availableBuses = buses.filter(
      (bus) => !unavailableBusIds.has(bus._id.toString())
    );

    // If available buses are found, return them
    if (availableBuses.length > 0) {
      return res.status(200).json(availableBuses);
    } else {
      return res.status(404).json({ msg: "No available buses found" });
    }
  } catch (error) {
    // Handle errors (e.g., database errors)
    console.error("Error fetching buses:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default getAllBuses;

const getBus = async (req, res) => {
  try {
    const { busId } = req.params;
    console.log(busId);
    // Validate busId
    if (!mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({ msg: "Invalid bus ID" });
    }

    // Convert busId to ObjectId and find the bus
    const bus = await Bus.findById(busId);
    console.log(bus);
    //finding this bus id on available bus list

    if (!bus) {
      return res.status(404).json({ msg: "No buses found" });
    }

    return res.status(200).json(bus);
  } catch (error) {
    console.error("Error fetching bus:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//for admin users
const addBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body); // Creates a new bus using the data from the request body
    await newBus.save(); // Saves the bus to MongoDB
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving bus" });
  }
};

const updateBus = async (req, res) => {
  try {
    const { busId } = req.params; // Extract busId from URL parameter
    const updatedData = req.body; // Extract updated bus data from request body

    // Find bus by ID and update it
    const updatedBus = await Bus.findByIdAndUpdate(busId, updatedData, {
      new: true,
    });

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json(updatedBus); // Respond with updated bus details
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBus = async (req, res) => {
  try {
    const { busId } = req.params; // Get the busId from the request parameters

    // Find and delete the bus
    const bus = await Bus.findByIdAndDelete(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    return res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Error deleting bus:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//

export { getAllBuses, addBus, updateBus, deleteBus, getBus };
