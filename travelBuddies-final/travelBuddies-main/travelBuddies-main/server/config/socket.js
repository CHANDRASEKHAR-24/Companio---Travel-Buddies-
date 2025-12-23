import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

export const setupSocketHandlers = (io) => {
    // Authentication middleware for Socket.io
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await User.findById(decoded.userId).select('-password');
            
            if (!user) {
                return next(new Error('Authentication error'));
            }

            socket.userId = user._id.toString();
            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.name} connected`);

        // Join user to their personal room
        socket.join(`user_${socket.userId}`);

        // Join chat room
        socket.on('join_chat', (chatId) => {
            socket.join(`chat_${chatId}`);
            console.log(`User ${socket.user.name} joined chat ${chatId}`);
        });

        // Leave chat room
        socket.on('leave_chat', (chatId) => {
            socket.leave(`chat_${chatId}`);
            console.log(`User ${socket.user.name} left chat ${chatId}`);
        });

        // Handle new message
        socket.on('send_message', async (data) => {
            try {
                const { chatId, content, type = 'text' } = data;

                // Verify user is participant of the chat
                const chat = await Chat.findById(chatId);
                if (!chat) {
                    socket.emit('error', { message: 'Chat not found' });
                    return;
                }

                const isParticipant = chat.participants.some(
                    participant => participant.toString() === socket.userId
                );

                if (!isParticipant) {
                    socket.emit('error', { message: 'You are not a participant of this chat' });
                    return;
                }

                // Create message
                const message = await Message.create({
                    sender: socket.userId,
                    chat: chatId,
                    content,
                    type,
                    readBy: [{ user: socket.userId, readAt: new Date() }]
                });

                // Update chat's last message
                await Chat.findByIdAndUpdate(chatId, {
                    lastMessage: message._id,
                    lastMessageAt: new Date()
                });

                // Populate sender info
                await message.populate('sender', 'name email');

                // Emit message to all participants in the chat
                io.to(`chat_${chatId}`).emit('new_message', message);

                // Emit chat update to all participants
                io.to(`chat_${chatId}`).emit('chat_updated', {
                    chatId,
                    lastMessage: message,
                    lastMessageAt: new Date()
                });

            } catch (error) {
                socket.emit('error', { message: 'Failed to send message' });
                console.error('Error sending message:', error);
            }
        });

        // Handle typing indicators
        socket.on('typing_start', (data) => {
            const { chatId } = data;
            socket.to(`chat_${chatId}`).emit('user_typing', {
                userId: socket.userId,
                userName: socket.user.name,
                chatId
            });
        });

        socket.on('typing_stop', (data) => {
            const { chatId } = data;
            socket.to(`chat_${chatId}`).emit('user_stopped_typing', {
                userId: socket.userId,
                chatId
            });
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`User ${socket.user.name} disconnected`);
        });
    });
};