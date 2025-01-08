import express from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/preferences', auth, updateProfile);

export default router;