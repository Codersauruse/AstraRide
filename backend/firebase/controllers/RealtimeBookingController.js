import { admin, db } from "../../config/firebase.js";
import User from "../../models/User.js";
import Bus from "../../models/Bus.js";
import Booking from "../../models/Booking.js";

const addToRealTimeBookings = async (req, res) => {
  try {
    const { userId, busId, isConfirmed } = req.body;
    if (!userId || !busId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    const bus = await Bus.findById(busId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    //storing data in mongo db database
    const newBooking = new Booking({ userId, busId, isConfirmed });

    // Convert Mongoose object to plain object and handle ObjectId fields
    const plainBooking = newBooking.toObject();
    plainBooking._id = plainBooking._id.toString(); // Convert _id to string
    plainBooking.userId = plainBooking.userId.toString(); // Convert userId to string
    plainBooking.busId = plainBooking.busId.toString();

    const BookingDoc = db.collection("Astraride").doc("Booking");
    await BookingDoc.update({
      bookings: admin.firestore.FieldValue.arrayUnion(plainBooking),
    });
    // Store the array of cars in a single document
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking added successfully", booking: newBooking });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ message: "Error saving booking" });
  }
};
const getAllRealTimeBookings = async (req, res) => {
  try {
    const docRef = db.collection("Astraride").doc("Booking");
    const doc = await docRef.get();

    // Check if the Firestore document exists
    if (!doc.exists) {
      return res.status(404).json({ message: "No bookings found." });
    }

    // Get the userId from route parameters
    const userId = req.params.id;

    // Extract bookings from the document
    const bookingList = doc.data().bookings;

    // Check if bookings exist
    if (!bookingList || bookingList.length === 0) {
      return res.status(404).json({ message: "Please book some buses." });
    }

    // If userId is provided, filter bookings by userId
    const userBookings = userId
      ? bookingList.filter((booking) => booking.userId === userId)
      : bookingList;

    // If no bookings found for the user
    if (userBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    // Return the bookings
    res.status(200).json(userBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      message: "An error occurred while fetching bookings.",
      error: error.message,
    });
  }
};

const updateRealtimeBooking = async (bookingId, selectedSeats, date) => {
  try {
    // Reference the specific booking document in Firestore
    const bookingRef = db.collection("Astraride").doc("Booking");

    // Get the existing bookings array
    const doc = await bookingRef.get();
    if (!doc.exists) {
      console.log("No bookings found.");
      return;
    }

    const bookings = doc.data().bookings || [];

    // Find and update the booking by ID
    const updatedBookings = bookings.map((booking) =>
      booking._id === bookingId
        ? { ...booking, isConfirmed: true, seatIds: selectedSeats, date: date }
        : booking
    );

    // Update Firestore document
    await bookingRef.update({ bookings: updatedBookings });

    console.log("Booking confirmed successfully.");
  } catch (error) {
    console.error("Error updating booking:", error);
  }
};

export { addToRealTimeBookings, getAllRealTimeBookings, updateRealtimeBooking };
