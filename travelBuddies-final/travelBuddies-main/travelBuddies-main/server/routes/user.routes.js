import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { registerUser, loginUser, updateUserProfile } from '../controllers/userController.js';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.use(authenticateToken);
router.put('/:id', updateUserProfile);

export default router;
