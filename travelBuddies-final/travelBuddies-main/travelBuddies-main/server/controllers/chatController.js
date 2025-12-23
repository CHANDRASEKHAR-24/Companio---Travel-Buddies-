import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import Trip from '../models/Trip.js';

// Create or get private chat
export async function createPrivateChat(req, res) {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;

        if (userId === currentUserId.toString()) {
            return res.status(400).json({ error: 'Cannot create chat with yourself' });
        }

        // Check if private chat already exists
        let chat = await Chat.findOne({
            type: 'private',
            participants: { $all: [currentUserId, userId] }
        }).populate('participants', 'name email');

        if (!chat) {
            chat = await Chat.create({
                type: 'private',
                participants: [currentUserId, userId]
            });
            await chat.populate('participants', 'name email');
        }

        res.json({ chat });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create private chat' });
    }
}

// Create or get group chat for trip
export async function createGroupChat(req, res) {
    try {
        const { tripId } = req.params;
        const currentUserId = req.user._id;

        // Check if user is a member of the trip
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const isMember = trip.members.some(member => member.user.toString() === currentUserId.toString());
        if (!isMember) {
            return res.status(403).json({ error: 'You are not a member of this trip' });
        }

        // Check if group chat already exists
        let chat = await Chat.findOne({
            type: 'group',
            trip: tripId
        }).populate('participants', 'name email');

        if (!chat) {
            // Create group chat with all trip members
            const memberIds = trip.members.map(member => member.user);
            chat = await Chat.create({
                name: `${trip.name} Chat`,
                type: 'group',
                participants: memberIds,
                trip: tripId
            });
            await chat.populate('participants', 'name email');
        }

        res.json({ chat });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create group chat' });
    }
}

// Get user's chats
export async function getUserChats(req, res) {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({
            participants: userId
        })
        .populate('participants', 'name email')
        .populate('lastMessage')
        .populate('trip', 'name destination')
        .sort({ lastMessageAt: -1 });

        res.json({ chats });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user chats' });
    }
}

// Get chat messages
export async function getChatMessages(req, res) {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        // Check if user is a participant of the chat
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        const isParticipant = chat.participants.some(participant => participant.toString() === userId.toString());
        if (!isParticipant) {
            return res.status(403).json({ error: 'You are not a participant of this chat' });
        }

        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name email')
            .sort({ createdAt: 1 });

        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get chat messages' });
    }
}

// Send message
export async function sendMessage(req, res) {
    try {
        const { chatId } = req.params;
        const { content, type = 'text' } = req.body;
        const senderId = req.user._id;

        // Check if user is a participant of the chat
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        const isParticipant = chat.participants.some(participant => participant.toString() === senderId.toString());
        if (!isParticipant) {
            return res.status(403).json({ error: 'You are not a participant of this chat' });
        }

        // Create message
        const message = await Message.create({
            sender: senderId,
            chat: chatId,
            content,
            type,
            readBy: [{ user: senderId, readAt: new Date() }]
        });

        // Update chat's last message
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message._id,
            lastMessageAt: new Date()
        });

        // Populate sender info
        await message.populate('sender', 'name email');

        res.status(201).json({ message });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
}

// Mark messages as read
export async function markAsRead(req, res) {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        // Mark all unread messages in this chat as read
        await Message.updateMany(
            { 
                chat: chatId,
                'readBy.user': { $ne: userId }
            },
            { 
                $push: { readBy: { user: userId, readAt: new Date() } }
            }
        );

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark messages as read' });
    }
}






