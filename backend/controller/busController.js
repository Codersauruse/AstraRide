import Bus from "../models/Bus.js";

//for every user
const getAllBuses = async (req, res) => {
  try {
    const { destination } = req.body; // Get the destination from the request body

    let buses;

    if (destination) {
      // If a destination is provided, filter buses by destination
      buses = await Bus.find({ destination });
    } else {
      // If no destination is provided, get all buses
      buses = await Bus.find();
    }

    // If buses are found, return them
    if (buses.length > 0) {
      return res.status(200).json(buses);
    } else {
      return res.status(404).json({ msg: "No buses found" });
    }
  } catch (error) {
    // Handle errors (e.g., database errors)
    console.error("Error fetching buses:", error);
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

export { getAllBuses, addBus, updateBus, deleteBus };
