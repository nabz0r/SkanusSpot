import express from 'express';
import { searchRestaurants, getSearchSuggestions, getSearchFilters } from '../controllers/search';

const router = express.Router();

/**
 * Routes de recherche
 */

// Recherche principale avec tous les filtres
router.get('/restaurants', searchRestaurants);

// Autocomplétion
router.get('/suggestions', getSearchSuggestions);

// Récupération des filtres disponibles
router.get('/filters', getSearchFilters);

export default router;