ApexTrader 📈

ApexTrader is a modern, full-stack MERN (MongoDB, Express.js, React, Node.js) trading dashboard inspired by high-performance broker architectures like Zerodha. It provides a seamless platform for users to manage simulated trading portfolios, track real-time holdings, monitor active positions, and inspect funds with secure cookie-based session authentication.

🚀 Features

Secure Authentication: Built with Passport.js local strategy and express-session with secure HTTP-only cookie configurations.

RESTful API Backend: Express.js routing structured for clean CRUD operations on holdings, positions, orders, and funds.

Interactive React Frontend: Single-Page Application (SPA) built with React Router, Axios, and responsive dashboard layouts.

Persistent Session Store: Utilizes connect-mongo for robust session storage directly within MongoDB.

Clean Architecture: Strict separation of concerns between backend server controllers/schemas and client components.

🛠️ Tech Stack

Frontend

React.js (v18+)

React Router DOM

Axios (with withCredentials support)

Bootstrap / Custom Responsive CSS UI

Backend

Node.js & Express.js

MongoDB & Mongoose (ODM)

Passport.js & passport-local-mongoose

connect-mongo for session persistence

CORS configuration for secure cross-origin communication

📂 Project Structure

ApexTrader/
├── backend/
│   ├── models/        # Mongoose database models (User, Holdings, Positions, Orders)
│   ├── schemas/       # Database schemas
│   ├── .env           # Environment variables (PORT, MONGO_URL, SESSION_SECRET)
│   └── index.js       # Express server entry point, Passport config, and API routes
└── frontend/
    ├── public/        # Static assets
    ├── src/
    │   ├── landing_page/  # Marketing pages (Home, About, Products, Pricing, Support)
    │   ├── dashboard/     # Core dashboard components (Holdings, Positions, Orders, Funds)
    │   ├── signup/        # Authentication components
    │   ├── App.js         # Main React component & Routing setup
    │   └── index.js       # React DOM entry point
    └── package.json