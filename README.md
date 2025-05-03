[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Explore World - REST Countries API Application

## Overview

**Explore World** is a full-stack web application built for the SE3040 assignment, leveraging the REST Countries API to provide an interactive platform for exploring country information. The application features a responsive frontend built with React and Bootstrap, and a secure backend powered by Node.js, Express, and MongoDB. Users can browse countries, filter by region, search by name, view detailed information, and manage favorite countries after authenticating.

## Functions of Explore World

The application offers the following key functionalities:

1. **Browse All Countries**:

   - View a list of all countries fetched from the REST Countries API.
   - Each country card displays the flag, name, capital, population, and region.
   - Includes a search bar to filter countries by name in real-time.
   - Access detailed country information via a "View Details" button.
   - Authenticated users can add countries to their favorites by clicking a heart icon.

2. **Filter by Region**:

   - Filter countries by geographical region (e.g., Africa, Asia, Europe).
   - Display filtered results in a responsive grid layout.

3. **User Authentication**:

   - **Register**: Create an account with name, email, password, and optional role (user/admin).
   - **Login**: Authenticate with email and password to access protected features.
   - Both forms include client-side validation (e.g., email format, password length) and visual icons for enhanced usability.
   - JWT tokens are stored in `localStorage` to maintain user sessions.

4. **Manage Favorite Countries**:

   - Authenticated users can add countries to their favorites by clicking the heart icon on country cards.
   - View favorite countries on a dedicated `/favorites` page, displaying full country details.
   - Unauthenticated users are redirected to the login page with a SweetAlert notification when attempting to add or view favorites.

5. **Responsive Design**:

   - Built with Bootstrap for a mobile-friendly interface.
   - Framer Motion animations enhance user experience (e.g., card transitions, form entrances).
   - Consistent layout across pages with a fixed Navbar for navigation.

6. **Secure Backend**:

   - User data is stored in MongoDB with hashed passwords (bcrypt).
   - Session management using `express-session` and MongoDB store.
   - JWT authentication protects routes like adding/viewing favorites.
   - CORS enabled for seamless frontend-backend communication.

## Prerequisites

- **Node.js**: Version 16.x or 18.x.
- **MongoDB**: Local instance or cloud (e.g., MongoDB Atlas).
- **Git**: For cloning the repository.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `backend/` with the following:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/rest-countries
   JWT_SECRET=your_jwt_secret_key_here
   SESSION_SECRET=your_session_secret_key_here
   PORT=5000
   ```

   - Generate secrets using:

     ```javascript
     const crypto = require('crypto');
     console.log(crypto.randomBytes(32).toString('hex'));
     ```

4. Start MongoDB (if local):

   ```bash
   mongod
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   - The server runs at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   - The app runs at `http://localhost:3000`.

## Usage

1. **Access the Application**:

   - Open `http://localhost:3000` in your browser.
   - Use the Navbar to navigate to:
     - **Home** (`/`): Welcome page.
     - **All Countries** (`/all`): Browse and search countries.
     - **Filter by Region** (`/filter`): View countries by region.
     - **Favorites** (`/favorites`): View favorite countries (requires login).
     - **Login** (`/login`): Authenticate.
     - **Register** (`/register`): Create an account.

2. **Key Interactions**:

   - **Search Countries**: Enter a country name in the search bar on `/all`.
   - **Add Favorites**: Log in, then click the heart icon on a country card in `/all`.
   - **View Favorites**: Navigate to `/favorites` to see your favorite countries.
   - **Authentication**: Register or log in to access protected features. Unauthenticated users are redirected to `/login` with a SweetAlert notification.

## Dependencies

### Frontend

- `react`, `react-dom`: Core React libraries.
- `react-router-dom`: For client-side routing.
- `axios`: For API requests.
- `bootstrap`: For responsive styling.
- `framer-motion`: For animations.
- `react-icons`: For icons (e.g., heart, user).
- `sweetalert2`: For user-friendly alerts.
- `react-spinners`: For loading indicators.

### Backend

- `express`: Web framework.
- `mongoose`: MongoDB ORM.
- `jsonwebtoken`: For JWT authentication.
- `bcryptjs`: For password hashing.
- `express-session`, `connect-mongo`: For session management.
- `cors`: For cross-origin requests.
- `dotenv`: For environment variables.

## Troubleshooting

1. **Framer Motion Errors**:
   - If you encounter `Module not found` errors for `framer-motion`, reinstall dependencies:

     ```bash
     rm -rf node_modules package-lock.json
     npm install framer-motion@10.18.0
     ```
2. **MongoDB Connection**:
   - Ensure MongoDB is running or update `MONGO_URI` to a cloud instance.
3. **CORS Issues**:
4. Verify `cors` middleware in `backend/server.js`:

   ```javascript
   app.use(cors());
   ```
5. **JWT Errors**:
   - Ensure `JWT_SECRET` and `SESSION_SECRET` are set in `backend/.env`.

## License

This project is for educational purposes as part of the SE3040 assignment and is not licensed for commercial use.