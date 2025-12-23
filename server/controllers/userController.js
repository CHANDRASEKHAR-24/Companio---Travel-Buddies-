// userController.js

import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

// Register a new user
export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide name, email, and password' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                error: 'ACCOUNT_EXISTS',
                message: 'This account already exists. Please login to continue.' 
            });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);
        
        res.status(201).json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token 
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ 
                error: 'ACCOUNT_EXISTS',
                message: 'This account already exists. Please login to continue.' 
            });
        }
        res.status(500).json({ error: error.message || 'Failed to register user' });
    }
}

// Login user
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ 
                error: 'ACCOUNT_NOT_FOUND',
                message: 'Account not found. Please create an account to continue.' 
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message || 'Failed to login' });
    }
}

// Update user profile
export async function updateUserProfile(req, res) {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
}
