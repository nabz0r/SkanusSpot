import { Request, Response } from 'express';
import { User } from '../models/User';
import { Review } from '../models/Review';
import { logger } from '../utils/logger';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } catch (error) {
    logger.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const { dietary, favoritesCuisines } = req.body;
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.preferences = {
      dietary: dietary || user.preferences?.dietary || [],
      favoritesCuisines: favoritesCuisines || user.preferences?.favoritesCuisines || []
    };

    const updatedUser = await user.save();
    res.json(updatedUser.preferences);
  } catch (error) {
    logger.error('Preferences update error:', error);
    res.status(500).json({ message: 'Error updating preferences' });
  }
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO: Implémenter le stockage des images avec un service comme AWS S3
    user.profilePicture = req.file.path;
    await user.save();

    res.json({ profilePicture: user.profilePicture });
  } catch (error) {
    logger.error('Profile picture upload error:', error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id)
      .populate('favorites')
      .select('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    logger.error('Get favorites error:', error);
    res.status(500).json({ message: 'Error getting favorites' });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(restaurantId)) {
      return res.status(400).json({ message: 'Restaurant already in favorites' });
    }

    user.favorites.push(restaurantId);
    await user.save();

    res.json({ message: 'Restaurant added to favorites' });
  } catch (error) {
    logger.error('Add favorite error:', error);
    res.status(500).json({ message: 'Error adding favorite' });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== restaurantId
    );
    await user.save();

    res.json({ message: 'Restaurant removed from favorites' });
  } catch (error) {
    logger.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Error removing favorite' });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ user: req.user?._id })
      .populate('restaurant', 'name type')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    logger.error('Get reviews error:', error);
    res.status(500).json({ message: 'Error getting reviews' });
  }
};