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

// Create new trip
export async function createTrip(tripData) {
    try {
        const response = await instance.post('/api/trips/create', tripData);
        return response.data.trip;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to create trip');
    }
}

// Get trip by id
export async function getTripById(tripId) {
    try {
        const response = await instance.get(`/api/trips/${tripId}`);
        return response.data.trip;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to get trip');
    }
}

// Get user trips
export async function getUserTrips(userId) {
    try {
        const response = await instance.get(`/api/trips/user-trips/${userId}`);
        return response.data.trips;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to get user trips');
    }
}

// Get all trips
export async function getAllTrips() {
    try {
        const response = await instance.get('/api/trips/getAllTrips');
        return response.data.trips;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to get all trips');
    }
}

// Join trip
export async function joinTrip(tripId) {
    try {
        const response = await instance.post(`/api/trips/${tripId}/join`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to join trip');
    }
}

// Leave trip
export async function leaveTrip(tripId) {
    try {
        const response = await instance.post(`/api/trips/${tripId}/leave`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to leave trip');
    }
}

// Delete trip
export async function deleteTrip(tripId) {
    try {
        const response = await instance.delete(`/api/trips/delete/${tripId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to delete trip');
    }
}

// Update trip
export async function updateTrip(tripId, tripData) {
    try {
        const response = await instance.put(`/api/trips/update/${tripId}`, tripData);
        return response.data.trip;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update trip');
    }
}

// Search trips
export async function searchTrips(searchParams) {
    try {
        const params = new URLSearchParams();
        if (searchParams.destination) params.append('destination', searchParams.destination);
        if (searchParams.search) params.append('search', searchParams.search);
        if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
        if (searchParams.startDate) params.append('startDate', searchParams.startDate);
        if (searchParams.endDate) params.append('endDate', searchParams.endDate);
        
        const response = await instance.get(`/api/trips/search?${params.toString()}`);
        return response.data.trips;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to search trips');
    }
}

