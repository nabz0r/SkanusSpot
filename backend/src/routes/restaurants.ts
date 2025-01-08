import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, updateRestaurant } from '../controllers/restaurants';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', auth, createRestaurant);
router.put('/:id', auth, updateRestaurant);

export default router;