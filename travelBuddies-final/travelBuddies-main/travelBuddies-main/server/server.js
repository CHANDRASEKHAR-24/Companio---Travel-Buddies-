import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from'nodemailer';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import { setupSocketHandlers } from './config/socket.js';

//Routes
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';
import chatRoutes from './routes/chat.routes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Config - Load environment variables first
dotenv.config();
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

////for email

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER || '', // Set in .env file
      pass: process.env.EMAIL_PASS || '' // Set in .env file (use app-specific password)
    }
  });


  app.post('/send-email', (req, res) => {
    const { to  } = req.body;
  


    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@travelbuddies.com',
        to : to,
        subject :"🌍 You're Invited: Join Us for an Exciting Group Trip with TravelBuddy! 🌟",
        html : ` <p> Dear ${to.split('@')[0]}  <br><br> I hope this message finds you well!  <br><br> I’m thrilled to extend an invitation to you for an exciting group trip that we’re organizing through TravelBuddy. It’s going to be an incredible adventure, and I’d love for you to join us! </p> <br> <br> <b> Why Join Us? <b/> <br><br> Fun and Fellowship: Meet new people and make lasting friendships while exploring a fantastic destination.<br> Organized Itinerary: Enjoy a well-planned itinerary with guided tours, activities, and free time. <br> Hassle-Free Experience: Let TravelBuddy handle all the details so you can focus on having a great time. <br>  <br><br> I hope you can make it! It’s going to be a memorable experience, and I look forward to sharing it with you. <br><br> Best regards, <br> <br> P.S. Don’t forget to check out the TravelBuddy website for more details and updates about the trip!`
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).json({ message: 'Email sent successfully!', info });
    });
  });

  /////

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/chats', chatRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Setup Socket.io handlers
setupSocketHandlers(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
