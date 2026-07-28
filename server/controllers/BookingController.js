import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"; // Added missing Hotel model import
import transporter from "../config/nodeMailer.js";
import User from '../models/user.js'
// Helper Function to check room availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    // strict $lt and $gt allow checkout and checkin on the same day
    const existingBooking = await Booking.findOne({
        room,
        checkInDate: { $lt: new Date(checkOutDate) },
        checkOutDate: { $gt: new Date(checkInDate) },
    });

    // If an existing booking is found, the room is NOT available
    return !existingBooking;
};

export default checkAvailability;

// API to check availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        if (!room || !checkInDate || !checkOutDate) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: room, checkInDate, or checkOutDate."
            });
        }

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

        return res.status(200).json({ success: true, isAvailable });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// API to create a new booking
// POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (
            isNaN(checkIn.getTime()) ||
            isNaN(checkOut.getTime()) ||
            checkOut <= checkIn
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid check-in/check-out dates.",
            });
        }

        // Check room availability
        const isAvailable = await checkAvailability({
            room,
            checkInDate,
            checkOutDate,
        });

        if (!isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Room is not available for selected dates.",
            });
        }

        // Get room details
        const roomData = await Room.findById(room).populate("hotel");

        if (!roomData) {
            return res.status(404).json({
                success: false,
                message: "Room not found.",
            });
        }

        // Calculate total price
        const nights = Math.ceil(
            (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );

        const totalPrice = nights * roomData.pricePerNight;

        // Create booking
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: Number(guests) || 1,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        // Get user details
        const userData = await User.findById(user);

        // Send confirmation email
        await transporter.sendMail({
            from: '"Hotel Booking" <onboarding@resend.dev>',
            to: userData.email,
            subject: "Booking Confirmation",
            html: `
        <h2>Your Booking Details</h2>

        <p>Dear ${userData.username},</p>

        <p>Thank you for your booking! Here are your booking details:</p>

        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
          <li><strong>Location:</strong> ${roomData.hotel.address}</li>
          <li><strong>Check In:</strong> ${new Date(
                booking.checkInDate
            ).toDateString()}</li>
          <li><strong>Check Out:</strong> ${new Date(
                booking.checkOutDate
            ).toDateString()}</li>
          <li><strong>Guests:</strong> ${booking.guests}</li>
          <li><strong>Booking Amount:</strong> $${booking.totalPrice
                } / stay</li>
        </ul>

        <p>We look forward to welcoming you!</p>

        <p>If you need to make any changes, feel free to contact us.</p>
      `,
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user })
            .populate("room hotel")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, bookings });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
};

// API to get all bookings for a hotel owner
// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
    try {
        // Standardized to req.user._id (or req.auth.userId depending on your middleware)
        const userId = req.user?._id || req.auth?.userId;

        const hotel = await Hotel.findOne({ owner: userId });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "No Hotel found for this owner" });
        }

        const bookings = await Booking.find({ hotel: hotel._id })
            .populate("room hotel user")
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0);

        return res.status(200).json({
            success: true,
            dashboardData: { totalBookings, totalRevenue, bookings }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch hotel bookings" });
    }
};

