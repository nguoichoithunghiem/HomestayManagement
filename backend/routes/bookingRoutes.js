import express from "express";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Route để tạo booking
router.post("/", createBooking);

export default router;
