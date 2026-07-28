# Hotel Booking App

A full stack hotel booking platform built with the MERN stack. The application allows users to search hotels, check room availability, make bookings, and receive booking confirmation emails. Hotel owners can register their hotels, manage rooms, and view booking statistics through a dedicated dashboard.

## Features

### User

• Sign up and login with Clerk Authentication.
• Search hotels by destination.
• View hotel rooms and amenities.
• Check room availability.
• Book rooms online.
• View booking history.
• Receive booking confirmation emails.

### Hotel Owner

• Register a hotel.
• Manage hotel rooms.
• View all bookings.
• Track total bookings and revenue.
• Access owner dashboard.

## Tech Stack

Frontend
• React
• Vite
• React Router
• Tailwind CSS
• Axios
• Clerk Authentication
• React Hot Toast

Backend
• Node.js
• Express.js
• MongoDB
• Mongoose
• Clerk Webhooks
• Nodemailer
• Resend SMTP

## Project Structure

client/
• React frontend

server/
• Express backend
• MongoDB models
• REST APIs
• Authentication middleware
• Email service

## Main Features

Authentication
• Secure authentication using Clerk.
• JWT protected APIs.

Hotel Management
• Hotel registration.
• Room management.
• Hotel owner dashboard.

Booking System
• Room availability checking.
• Date validation.
• Booking creation.
• Booking history.
• Revenue calculation.

Email Notifications
• Booking confirmation emails.
• SMTP powered by Resend.

## Installation

Clone the repository

```bash
git clone https://github.com/abdullahkhalil00/Hotel-Booking-App
```

Install dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder

```env
MONGODB_URI=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
SMTP_PASS=
JWT_SECRET=
CURRENCY=$
```

Create a `.env` file inside the client folder

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CURRENCY=$
```

Run the backend

```bash
npm run server
```

Run the frontend

```bash
npm run dev
```

## API Endpoints

Authentication
• GET /api/user

Hotels
• POST /api/hotels/register

Rooms
• GET /api/rooms

Bookings
• POST /api/bookings/check-availability
• POST /api/bookings/book
• GET /api/bookings/user
• GET /api/bookings/hotel

## Future Improvements

• Online payment integration.
• Hotel image upload.
• Booking cancellation.
• Review and rating system.
• Email verification.
• Password recovery.
• Admin dashboard.
• Wishlist functionality.

## Author

Abdullah Khalil

BS Software Engineering Student

Punjab University College of Information Technology (PUCIT)

## License

This project is created for learning and portfolio purposes.
