import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000

connectDB()
const app = express()
app.use(cors())
app.get('/' , (req,res) => res.send("APi is working "))

app.listen(PORT , () => console.log(`Server is running on ${PORT}`))