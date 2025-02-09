import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./route/userRoute.js";
import busRouter from "./route/busRoute.js";
import bookingRouter from "./route/bookingRoute.js";
import Router from "./firebase/routes/realTimeTableRoute.js";
import RealtImebookingRouter from "./firebase/routes/realTimeBookingRoute.js";
import RealtimeSeatRouter from "./firebase/routes/realTImeSeatRoute.js";

const result = dotenv.config({ path: "./config/.env" });
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/bus/realtime", Router);
app.use("/api/bus", busRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/realtime/booking", RealtImebookingRouter);
app.use("/api/realtime/seats", RealtimeSeatRouter);

// Start the server
app.listen(port, () => {
  console.log(`heelooo `);
});
