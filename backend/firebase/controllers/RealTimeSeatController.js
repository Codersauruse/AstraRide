import moment from "moment";
import Seat from "../../models/Seat.js";
import { admin, db } from "../../config/firebase.js";
import firebase from "firebase-admin";

// Save seats function
const saveSeats = async (busId, bookingId, userId, seatarr, date) => {
  try {
    if (!userId || !busId || !bookingId || !date || seatarr.length === 0) {
      return { status: 400, message: "Missing required fields" };
    }

    const today = moment().format("YYYY-MM-DD"); // Get today's date in yyyy-mm-dd format
    const inputDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"); // Ensure proper format

    // Firestore reference (collection: Astraride, document: Seats)
    const seatDocRef = db.collection("Astraride").doc("Seats");

    if (inputDate === today) {
      // Append new seat reservation to the "Seats" array in Firestore
      await seatDocRef.update({
        Seats: firebase.firestore.FieldValue.arrayUnion({
          busId,
          bookingId,
          userId,
          seatNumbers: seatarr,
          status: "Reserved",
          date: inputDate,
        }),
      });

      return { status: 200, message: "Seats added to Firestore array" };
    } else if (moment(inputDate).isAfter(today)) {
      // Store in MongoDB
      const seat = new Seat({
        busId,
        bookingId,
        userId,
        seatNumbers: seatarr,
        status: "Reserved",
        date: inputDate,
      });
      await seat.save();

      return { status: 200, message: "Seats saved in MongoDB" };
    }
  } catch (error) {
    console.error("Error saving seat:", error.message);
    return { status: 500, message: error.message };
  }
};

// Get all reserved seat numbers for a bus
const getAllreservedSeats = async (busId) => {
  try {
    if (!busId) {
      return { status: 400, message: "Missing required busId" };
    }

    const docRef = db.collection("Astraride").doc("Seats");
    const doc = await docRef.get();

    if (!doc.exists) {
      return { status: 404, message: "No seat reservations found." };
    }

    const seatList = doc.data().Seats || [];

    // Filter seats by busId
    const busSeats = seatList
      .filter((seat) => seat.busId === busId)
      .flatMap((seat) => seat.seatNumbers); // Extract seat numbers

    return { status: 200, reservedSeats: busSeats };
  } catch (error) {
    console.error("Error fetching reserved seats:", error.message);
    return { status: 500, message: error.message };
  }
};

// Function to update number of seats in a bus
const updateSeats = async (busId, bookingId, seatarr) => {
  try {
    if (!busId || !bookingId || seatarr.length === 0) {
      return { status: 400, message: "Missing required fields" };
    }

    // Find the bus in Firestore and update the seats
    const busRef = db.collection("Astraride").doc("Seats");

    await busRef.update({
      Seats: admin.firestore.FieldValue.arrayUnion({
        busId,
        bookingId,
        seatNumbers: seatarr,
        status: "Reserved",
      }),
    });

    return { status: 200, message: "Seats updated successfully" };
  } catch (error) {
    console.error("Error updating seats:", error.message);
    return { status: 500, message: error.message };
  }
};

// Get total number of seats booked for a bus
const getNumberOfSeats = async (busId) => {
  try {
    if (!busId) {
      return { status: 400, message: "Missing required busId" };
    }

    const docRef = db.collection("Astraride").doc("Seats");
    const doc = await docRef.get();

    if (!doc.exists) {
      return { status: 404, message: "No seat reservations found." };
    }

    const seatList = doc.data().Seats || [];
    const totalSeats = seatList
      .filter((seat) => seat.busId === busId)
      .reduce((acc, seat) => acc + seat.seatNumbers.length, 0); // Count booked seats

    return { status: 200, totalSeats };
  } catch (error) {
    console.error("Error fetching number of seats:", error.message);
    return { status: 500, message: error.message };
  }
};

export { saveSeats, getAllreservedSeats, updateSeats, getNumberOfSeats };
