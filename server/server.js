import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhook from "./controllers/clerkWebHook.js";

const PORT = process.env.PORT || 3000

connectDB()
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







app.get('/', (req, res) => res.send("APi is working "))





app.listen(PORT, () => console.log(`Server is running on ${PORT}`))