import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"; // Added missing Hotel model import

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

        // Date validation check
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime()) || checkOut <= checkIn) {
            return res.status(400).json({
                success: false,
                message: "Invalid check-in/check-out dates. Check-out must be after check-in."
            });
        }

        // Before Booking: Check Availability
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Room is not available for selected dates." });
        }

        // Retrieve room data
        const roomData = await Room.findById(room).populate("hotel");
        if (!roomData) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }

        // Calculate nights and total price
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const totalPrice = roomData.pricePerNight * nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: Number(guests) || 1,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        return res.status(201).json({ 
            success: true, 
            message: "Booking created successfully", 
            booking 
        });
    } catch (error) {
        console.error("Booking Error:", error);
        return res.status(500).json({ success: false, message: "Failed to create booking" });
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

