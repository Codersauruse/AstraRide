import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./route/userRoute.js";
import busRouter from "./route/busRoute.js";

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
app.use("/api/bus", busRouter);
// Start the server
app.listen(port, () => {
  console.log(`heelooo `);
});
