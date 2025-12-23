import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// Add token to requests
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Create or get private chat
export async function createPrivateChat(userId) {
    try {
        const response = await instance.post(`/api/chats/private/${userId}`);
        return response.data.chat;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to create private chat');
    }
}

// Create or get group chat for trip
export async function createGroupChat(tripId) {
    try {
        const response = await instance.post(`/api/chats/group/${tripId}`);
        return response.data.chat;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to create group chat');
    }
}

// Get user's chats
export async function getUserChats() {
    try {
        const response = await instance.get('/api/chats/user');
        return response.data.chats;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to get user chats');
    }
}

// Get chat messages
export async function getChatMessages(chatId) {
    try {
        const response = await instance.get(`/api/chats/${chatId}/messages`);
        return response.data.messages;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to get chat messages');
    }
}

// Send message
export async function sendMessage(chatId, content, type = 'text') {
    try {
        const response = await instance.post(`/api/chats/${chatId}/messages`, {
            content,
            type
        });
        return response.data.message;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to send message');
    }
}

// Mark messages as read
export async function markAsRead(chatId) {
    try {
        const response = await instance.put(`/api/chats/${chatId}/read`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to mark messages as read');
    }
}






