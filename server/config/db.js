import mongoose from "mongoose";

async function connectDB() {
  try {
    console.log(process.env.MONGODB_URI);

    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;