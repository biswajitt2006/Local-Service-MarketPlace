# 🏠 Local Service Marketplace

A full-stack web application that connects local service providers with customers. Users can browse service categories, discover providers, book services, leave reviews, and manage everything through role-based dashboards.

---

## ✨ Features

- **User Authentication** — Secure signup/login with JWT-based auth and role-based access (User, Provider, Admin)
- **Service Categories** — Browse and search services by category
- **Provider Profiles** — View detailed provider information, ratings, and reviews
- **Booking System** — Book services with date/time selection and confirmation flow
- **Reviews & Ratings** — Leave and read reviews for service providers
- **Smart Recommendations** — Built-in recommendation engine to suggest relevant providers
- **Role-Based Dashboards**
  - **User Dashboard** — Manage bookings and profile
  - **Provider Dashboard** — Manage services, view incoming bookings
  - **Admin Dashboard** — Oversee users, providers, categories, and platform activity

---

## 🛠️ Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Frontend   | React 19, React Router v7, Tailwind CSS, Vite      |
| Backend    | Node.js, Express.js                                |
| Database   | MongoDB (via Mongoose)                             |
| Auth       | JSON Web Tokens (JWT), bcryptjs                    |
| Validation | express-validator                                  |
| Icons      | Lucide React                                       |

---

## 📁 Project Structure

```
Prototype_LM/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route handlers (auth, booking, provider, review, admin, user)
│   │   ├── middleware/     # Auth & error handling middleware
│   │   ├── models/         # Mongoose models (User, Provider, Booking, Review, Category)
│   │   ├── routes/         # Express route definitions
│   │   ├── utils/          # Recommendation engine
│   │   └── server.js       # App entry point
│   ├── .env                # Environment variables (not committed)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, Cards, etc.)
│   │   ├── context/        # React Context for global state
│   │   ├── data/           # Static JSON data (providers, reviews, services)
│   │   ├── pages/          # Page components (Home, Login, Signup, Dashboards, etc.)
│   │   ├── services/       # API service layer
│   │   ├── utils/          # Recommendation utilities
│   │   ├── App.jsx         # Root component with routing
│   │   └── main.jsx        # App entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm**
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone https://github.com/biswajitt2006/Local-Service-MarketPlace.git
cd Local-Service-MarketPlace
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Login and receive JWT      |
| GET    | `/api/providers`     | List all service providers |
| GET    | `/api/providers/:id` | Get provider details       |
| POST   | `/api/bookings`      | Create a new booking       |
| GET    | `/api/bookings`      | Get user's bookings        |
| POST   | `/api/reviews`       | Submit a review            |
| GET    | `/api/reviews/:id`   | Get reviews for a provider |
| GET    | `/api/admin/*`       | Admin management routes    |

---

## 🔐 Environment Variables

| Variable     | Description                 |
| ------------ | --------------------------- |
| `PORT`       | Server port (default: 5000) |
| `NODE_ENV`   | Environment mode            |
| `MONGO_URI`  | MongoDB connection string   |
| `JWT_SECRET` | Secret key for JWT signing  |
| `JWT_EXPIRE` | JWT token expiry duration   |

---

## 📄 License

ISC
