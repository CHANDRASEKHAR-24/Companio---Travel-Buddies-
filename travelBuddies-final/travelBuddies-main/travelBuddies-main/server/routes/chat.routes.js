import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
    createPrivateChat,
    createGroupChat,
    getUserChats,
    getChatMessages,
    sendMessage,
    markAsRead
} from '../controllers/chatController.js';

const router = Router();

// All chat routes require authentication
router.use(authenticateToken);

// Create or get private chat
router.post('/private/:userId', createPrivateChat);

// Create or get group chat for trip
router.post('/group/:tripId', createGroupChat);

// Get user's chats
router.get('/user', getUserChats);

// Get chat messages
router.get('/:chatId/messages', getChatMessages);

// Send message
router.post('/:chatId/messages', sendMessage);

// Mark messages as read
router.put('/:chatId/read', markAsRead);

export default router;






