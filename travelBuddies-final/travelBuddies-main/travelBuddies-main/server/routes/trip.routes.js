import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
    createTrip, 
    getTrip, 
    updateTrip, 
    deleteTrip, 
    getUserTrips, 
    getAllTrips,
    joinTrip,
    leaveTrip,
    searchTrips
} from '../controllers/tripController.js';

const router = Router();

// Protected routes - require authentication (specific routes first)
router.get('/search', authenticateToken, searchTrips);
router.get('/getAllTrips', authenticateToken, getAllTrips);

// Public route for viewing a single trip (must be after specific routes)
router.get('/:id', getTrip);

// Protected routes
router.use(authenticateToken);

router.post('/create', createTrip);
router.get('/user-trips/:id', getUserTrips);
router.put('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);
router.post('/:tripId/join', joinTrip);
router.post('/:tripId/leave', leaveTrip);

export default router;
