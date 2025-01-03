import express from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth';
import { auth } from '../middleware/auth';

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.use(auth);
router.post('/logout', logout);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;