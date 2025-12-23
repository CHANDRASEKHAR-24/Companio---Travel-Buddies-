import { createSlice } from '@reduxjs/toolkit';

// Safely parse user from localStorage
const getInitialUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        return JSON.parse(userStr);
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
    }
};

const initialState = {
    user: getInitialUser(),
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Save user state to local storage
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
