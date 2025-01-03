import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';

/**
 * Recherche avancée des restaurants avec filtres multiples
 * @route GET /api/search/restaurants
 */
export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const {
      q, // recherche texte
      type, // halal ou kosher
      cuisine, // types de cuisine
      priceRange, // gamme de prix
      rating, // note minimale
      features, // spécificités (livraison, parking, etc)
      lat, // latitude pour recherche géo
      lng, // longitude pour recherche géo
      radius = 5000, // rayon de recherche en mètres
      sortBy = 'rating', // champ de tri
      sortOrder = 'desc', // ordre de tri
      page = 1,
      limit = 10
    } = req.query;

    // Construction de la requête
    const query: any = { status: 'active' };

    // Filtre par type
    if (type) {
      query.type = type;
    }

    // Filtre par cuisine
    if (cuisine) {
      query.cuisine = { $in: (cuisine as string).split(',') };
    }

    // Filtre par prix
    if (priceRange) {
      query.priceRange = { $in: (priceRange as string).split(',') };
    }

    // Filtre par note minimale
    if (rating) {
      query['rating.average'] = { $gte: parseFloat(rating as string) };
    }

    // Filtre par fonctionnalités
    if (features) {
      query.features = { $all: (features as string).split(',') };
    }

    // Recherche géolocalisée
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
          },
          $maxDistance: parseInt(radius as string)
        }
      };
    }

    // Recherche textuelle
    if (q) {
      query.$text = { $search: q as string };
    }

    // Construction du tri
    const sort: any = {};
    if (q) {
      sort.score = { $meta: 'textScore' };
    }
    if (sortBy) {
      sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
    }

    // Exécution de la requête avec pagination
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .select(q ? { score: { $meta: 'textScore' } } : {})
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('owner', 'name'),
      Restaurant.countDocuments(query)
    ]);

    // Enrichir avec la distance si recherche géo
    let enrichedResults = restaurants;
    if (lat && lng) {
      enrichedResults = restaurants.map(restaurant => {
        const distance = calculateDistance(
          parseFloat(lat as string),
          parseFloat(lng as string),
          restaurant.location.coordinates[1],
          restaurant.location.coordinates[0]
        );
        return {
          ...restaurant.toObject(),
          distance: Math.round(distance * 100) / 100
        };
      });
    }

    res.json({
      results: enrichedResults,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string))
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Error during search' });
  }
};

/**
 * Suggestions de recherche (autocomplétion)
 * @route GET /api/search/suggestions
 */
export const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    const { q, limit = 5 } = req.query;

    if (!q) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await Restaurant.aggregate([
      {
        $match: {
          $text: { $search: q as string },
          status: 'active'
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          type: 1,
          cuisine: 1,
          score: { $meta: 'textScore' }
        }
      },
      { $sort: { score: -1 } },
      { $limit: parseInt(limit as string) }
    ]);

    res.json({ suggestions });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Error getting suggestions' });
  }
};

/**
 * Récupère les filtres disponibles (cuisines, features, etc)
 * @route GET /api/search/filters
 */
export const getSearchFilters = async (req: Request, res: Response) => {
  try {
    const [cuisines, features, priceRanges] = await Promise.all([
      Restaurant.distinct('cuisine'),
      Restaurant.distinct('features'),
      Restaurant.distinct('priceRange')
    ]);

    res.json({
      cuisines: cuisines.sort(),
      features: features.sort(),
      priceRanges: priceRanges.sort(),
      types: ['halal', 'kosher']
    });

  } catch (error) {
    console.error('Filters error:', error);
    res.status(500).json({ error: 'Error getting filters' });
  }
};

// Fonction utilitaire pour calculer la distance entre deux points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}