import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhook from "./controllers/clerkWebHook.js";
import userRouter from "./routes/userRouter.js";
import hotelRouter from "./routes/HotelRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/Roomroute.js";
import bookingRouter from "./routes/BookingRoutes.js";
const PORT = process.env.PORT || 3000

await connectDB();
await connectCloudinary()
const app = express()
// Middle ware
app.use(cors())
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}))
app.use(clerkMiddleware())
app.post("/api/clerk", clerkWebhook);
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)




app.get('/', (req, res) => res.send("APi is working "))





app.listen(PORT, () => console.log(`Server is running on ${PORT}`))