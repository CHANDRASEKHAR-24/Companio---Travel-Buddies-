# Quick Setup Instructions

## Step 1: Install Dependencies

### Server
```bash
cd server
npm install
```

### Client
```bash
cd client
npm install
```

## Step 2: Setup Environment Variables

### Server (.env file in server folder)
```env
MONGODB_URI=mongodb://localhost:27017/travelbuddies
PORT=5000
NODE_ENV=development
JWT_SECRET=change-this-to-a-random-secret-key
CLIENT_URL=http://localhost:5173
```

### Client (.env file in client folder)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Step 3: Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

## Step 4: Run the Application

### Terminal 1 - Start Server
```bash
cd server
npm start
```

### Terminal 2 - Start Client
```bash
cd client
npm run dev
```

## Step 5: Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Important Security Notes

1. **Never commit .env files** - They are already in .gitignore
2. **Change JWT_SECRET** - Use a strong random string
3. **Use strong passwords** in production
4. **Enable HTTPS** in production

## Default Ports

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017
