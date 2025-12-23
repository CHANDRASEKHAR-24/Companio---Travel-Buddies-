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

// Register a new user
export async function registerUser(userData) {
    try {
        const response = await instance.post('/api/users/register', userData);
        const { user, token } = response.data;
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { user, token };
    } catch (error) {
        const errorData = error.response?.data;
        const errorObj = new Error(errorData?.message || errorData?.error || 'Failed to register user');
        errorObj.errorCode = errorData?.error;
        throw errorObj;
    }
}

// Login user
export async function loginUser(credentials) {
    try {
        const response = await instance.post('/api/users/login', credentials);
        const { user, token } = response.data;
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { user, token };
    } catch (error) {
        const errorData = error.response?.data;
        const errorObj = new Error(errorData?.message || errorData?.error || 'Failed to login user');
        errorObj.errorCode = errorData?.error;
        throw errorObj;
    }
}

// Logout user
export async function logoutUser() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log("Logout successful");
    } catch (error) {
        throw new Error('Failed to logout user');
    }
}

// Get current user
export function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Get token
export function getToken() {
    return localStorage.getItem('token');
}









