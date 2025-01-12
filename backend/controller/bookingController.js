import mongoose from "mongoose";

import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import bookingRouter from "../route/bookingRoute.js";

//view all the bookings according to user
const getAllBookings = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from route parameters
    const bookingList = await Booking.find({ userId }); // Find bookings by userId

    if (bookingList.length === 0) {
      return res.status(404).json({ message: "please book some busses." });
    }

    res.status(200).json(bookingList); // Send the list of bookings as a response
  } catch (error) {
    console.error(error); // Log any errors
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  }
};
//get one booking

const getOneBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log(bookingId);
    // Validate busId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ msg: "Invalid booking ID" });
    }

    // Convert busId to ObjectId and find the bus
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching bus:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//adding a bus to user's booking

const addToBookings = async (req, res) => {
  try {
    const { userId, busId, isConfirmed } = req.body;
    if (!userId || !busId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    const bus = await Bus.findById(busId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const newBooking = new Booking({ userId, busId, isConfirmed });

    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking added successfully", booking: newBooking });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ message: "Error saving booking" });
  }
};

//booking a bus (confirm the booking by selecting nnumber of seats)
const confirmBooking = async (req, res) => {
  try {
    const { userId, busId, numberOfSeats, date } = req.body;

    if (!userId || !busId || !numberOfSeats || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking(req.body); // Create a new booking using the data from the request body
    await newBooking.save(); // Save the booking to MongoDB
    const bus = await Bus.findById(busId);

    const newPayment = new Payment({
      bookingId: newBooking._id,
      userId,
      amount: numberOfSeats * bus.price, // Assuming each seat costs 10 (this is just an example)
      paymentStatus: "unpaid",
    });
    await newPayment.save();

    res
      .status(201)
      .json({ message: "Booking added successfully", booking: newBooking });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ message: "Error saving booking" });
  }
};

//cancel a booking

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id; // Use bookingId instead of busId for clarity

    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }

    const booking = await Booking.findByIdAndDelete(bookingId);
    const unpaidPayment = await Payment.findOne({
      bookingId,
      paymentStatus: "unpaid",
    });
    if (unpaidPayment) {
      await Payment.findByIdAndDelete(unpaidPayment._id);
    }
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "No booking found with this ID" });
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted the booking" });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ success: false, message: "Error deleting booking" });
  }
};

//admin functions

export {
  getAllBookings,
  confirmBooking,
  deleteBooking,
  addToBookings,
  getOneBooking,
};
