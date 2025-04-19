// controllers/getRealtimeTableController.js

import { db } from "../../config/firebase.js";

const getAvailableBuses = async (req, res) => {
  try {
    const { destination, date } = req.query; // Get the destination from query parameters

    const today = new Date();
    //const formattedDate = today.toISOString().split("T")[0];
    const formattedDate = date != "" ? date : today.toISOString().split("T")[0];
    console.log(formattedDate);
    // Fetch all buses from the Timetable document in the Astraride collection
    const timetableDoc = await db
      .collection("Astraride")
      .doc("Timetable")
      .get();
    if (!timetableDoc.exists) {
      return res.status(404).json({ msg: "Timetable document not found" });
    }
    const buses = timetableDoc.data().busdetails;

    // Filter buses based on destination if provided
    const filteredBuses = destination
      ? buses.filter((bus) => bus.destination === destination)
      : buses;

    // Fetch unavailable buses from the unavailableBuses document in the Astraride collection
    const unavailableBusesDoc = await db
      .collection("Astraride")
      .doc("unavailableBusses")
      .get();
    if (!unavailableBusesDoc.exists) {
      return res
        .status(404)
        .json({ msg: "Unavailable buses document not found" });
    }
    const unavailableBuses = unavailableBusesDoc.data().busses;

    // Create a Set of unavailable bus IDs for today's date
    const unavailableBusIds = new Set(
      unavailableBuses
        .filter((bus) => bus.date.includes(formattedDate)) // Only include buses with today's date
        .map((bus) => bus.busId.toString()) // Map to busId strings
    );
    //console.log(unavailableBusIds);
    // Filter available buses
    const availableBuses = filteredBuses.filter(
      (bus) => !unavailableBusIds.has(bus._id.toString())
    );
    //console.log(availableBuses);
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

export { getAvailableBuses };
