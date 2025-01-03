import express from 'express';
import { protect } from '../middleware/auth';
import { 
  updateProfile,
  updatePreferences,
  uploadProfilePicture,
  getFavorites,
  addFavorite,
  removeFavorite,
  getReviews
} from '../controllers/profile';

const router = express.Router();

router.use(protect); // Toutes les routes de profil nécessitent une authentification

router.put('/update', updateProfile);
router.put('/preferences', updatePreferences);
router.post('/upload-picture', uploadProfilePicture);
router.get('/favorites', getFavorites);
router.post('/favorites/:restaurantId', addFavorite);
router.delete('/favorites/:restaurantId', removeFavorite);
router.get('/reviews', getReviews);

export default router;