import express from 'express';
import authRoutes from './auth';
import oauthRoutes from './oauth';
import restaurantRoutes from './restaurants';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/oauth', oauthRoutes);
router.use('/restaurants', restaurantRoutes);

export default router;