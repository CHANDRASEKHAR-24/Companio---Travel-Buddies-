// tripController.js

import Trip from '../models/Trip.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

import { countDays } from '../utils/formatDate.js';


// Create a new trip
export async function createTrip(req, res) {
    try {
        const { name, destination, startDate, endDate, cost, invitations, description } = req.body;
        const createdBy = req.user._id; // Get from authenticated user
        
        const trip = await Trip.create({
            name,
            destination,
            startDate,
            endDate,
            cost,
            totalDays: countDays(startDate, endDate),
            description,
            invitations: invitations ? invitations.map(email => ({ email })) : [],
            createdBy,
            members: [{ user: createdBy, joinedAt: new Date() }], // Creator is automatically a member
        });

        // Update the user's trips array
        await User.findByIdAndUpdate(createdBy, { $push: { trips: trip._id } });

        // Populate the trip data before sending response
        const populatedTrip = await Trip.findById(trip._id)
            .populate('createdBy', 'name email')
            .populate('members.user', 'name email');

        console.log('Trip created successfully:', populatedTrip);
        res.status(201).json({ message: 'Trip created successfully', trip: populatedTrip });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).json({ error: error.message || 'Failed to create trip' });
    }
}

// Get all trips of a user
export async function getUserTrips(req, res) {
    try {
        const user = await User.findById(req.params.id).populate('trips');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ trips: user.trips });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user trips' });
    }
}

// Get a trip by ID
export async function getTrip(req, res) {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get trip' });
    }
}

// Get all trips
export async function getAllTrips(req, res) {
    try {
        const trips = await Trip.find()
            .populate('createdBy', 'name email')
            .populate('members.user', 'name email')
            .sort({ createdAt: -1 });
        res.json({ trips });
    } catch (error) {
        console.error('Error getting trips:', error);
        res.status(500).json({ error: 'Failed to get trips' });
    }
}

// Search trips by destination
export async function searchTrips(req, res) {
    try {
        const { destination, search, maxPrice, startDate, endDate } = req.query;
        
        let query = {};
        
        if (destination) {
            query.destination = { $regex: destination, $options: 'i' };
        }
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { destination: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (maxPrice) {
            query.cost = { $lte: parseFloat(maxPrice) };
        }
        
        if (startDate) {
            query.startDate = { $gte: new Date(startDate) };
        }
        
        if (endDate) {
            query.endDate = { $lte: new Date(endDate) };
        }
        
        const trips = await Trip.find(query)
            .populate('createdBy', 'name email')
            .populate('members.user', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({ trips });
    } catch (error) {
        console.error('Error searching trips:', error);
        res.status(500).json({ error: 'Failed to search trips' });
    }
}

// Update a trip
export async function updateTrip(req, res) {
    try {
        const { name, destination, startDate, endDate, description, cost } = req.body;
        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            { name, destination, startDate, endDate, description, cost },
            { new: true }
        );
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update trip' });
    }
}

// Delete a trip
export async function deleteTrip(req, res) {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trip' });
    }
}

// Join a trip
export async function joinTrip(req, res) {
    try {
        const { tripId } = req.params;
        const userId = req.user._id;

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Check if user is already a member
        const isAlreadyMember = trip.members.some(member => member.user.toString() === userId.toString());
        if (isAlreadyMember) {
            return res.status(400).json({ error: 'You are already a member of this trip' });
        }

        // Add user to trip members
        trip.members.push({ user: userId, joinedAt: new Date() });
        await trip.save();

        // Add trip to user's trips array
        await User.findByIdAndUpdate(userId, { $push: { trips: tripId } });

        res.json({ message: 'Successfully joined the trip', trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to join trip' });
    }
}

// Leave a trip
export async function leaveTrip(req, res) {
    try {
        const { tripId } = req.params;
        const userId = req.user._id;

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Check if user is the creator
        if (trip.createdBy.toString() === userId.toString()) {
            return res.status(400).json({ error: 'Trip creator cannot leave the trip' });
        }

        // Remove user from trip members
        trip.members = trip.members.filter(member => member.user.toString() !== userId.toString());
        await trip.save();

        // Remove trip from user's trips array
        await User.findByIdAndUpdate(userId, { $pull: { trips: tripId } });

        res.json({ message: 'Successfully left the trip', trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to leave trip' });
    }
}
