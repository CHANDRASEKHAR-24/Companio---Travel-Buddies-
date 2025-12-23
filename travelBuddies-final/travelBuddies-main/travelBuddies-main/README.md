# TravelBuddies - Group Travel Planning Platform

A full-stack web application for connecting travelers and planning group trips together. Users can create trips, join existing trips, chat with other travelers, and coordinate their adventures.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Trip Management**: Create, view, update, and delete trips
- **Trip Discovery**: Browse and search available trips
- **Real-time Chat**: Private and group chat functionality using Socket.io
- **User Profiles**: Manage your profile and view your trips
- **Responsive Design**: Beautiful UI that works on all devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd travelBuddies-main
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Environment Setup

#### Server Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/travelbuddies
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:5173
```

**⚠️ IMPORTANT**: Change `JWT_SECRET` to a strong random string in production!

#### Client Environment Variables

Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

## 🏃 Running the Application

### Development Mode

#### Start the Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

#### Start the Client

Open a new terminal:

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

### Production Build

#### Build the Client

```bash
cd client
npm run build
```

#### Start Production Server

```bash
cd server
NODE_ENV=production npm start
```

## 📁 Project Structure

```
travelBuddies-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── contexts/      # React contexts
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
└── README.md
```

## 🔐 Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Change JWT_SECRET** - Use a strong, random string in production
3. **Use HTTPS in production** - Always use secure connections
4. **Validate user input** - All inputs are validated on both client and server
5. **Protect API routes** - Authentication middleware protects sensitive routes

## 🛠️ Technologies Used

### Frontend
- React.js
- Redux (State Management)
- React Router (Routing)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Socket.io Client (Real-time communication)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Socket.io (Real-time communication)
- bcrypt (Password hashing)

## 📝 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile

### Trips
- `GET /api/trips/getAllTrips` - Get all trips (protected)
- `GET /api/trips/search` - Search trips (protected)
- `GET /api/trips/:id` - Get trip by ID
- `POST /api/trips/create` - Create trip (protected)
- `PUT /api/trips/update/:id` - Update trip (protected)
- `DELETE /api/trips/delete/:id` - Delete trip (protected)
- `POST /api/trips/:tripId/join` - Join trip (protected)
- `POST /api/trips/:tripId/leave` - Leave trip (protected)

### Chat
- `POST /api/chats/private/:userId` - Create/get private chat (protected)
- `POST /api/chats/group/:tripId` - Create/get group chat (protected)
- `GET /api/chats/user` - Get user's chats (protected)
- `GET /api/chats/:chatId/messages` - Get chat messages (protected)
- `POST /api/chats/:chatId/messages` - Send message (protected)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB connection string format

### Port Already in Use
- Change `PORT` in server `.env` file
- Update `VITE_API_BASE_URL` in client `.env` file

### CORS Errors
- Ensure `CLIENT_URL` in server `.env` matches your client URL
- Check CORS configuration in `server.js`

## 📄 License

This project is for educational purposes.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Note**: Remember to change all default credentials and secrets before deploying to production!



