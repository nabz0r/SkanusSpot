import { Request, Response } from 'express';
import { User } from '../models/User';

export const updateProfile = async (req: Request, res: Response) => {
  const updates = req.body;
  const allowedUpdates = ['name', 'preferences.dietary', 'preferences.cuisinePreferences'];

  const validUpdates = Object.keys(updates)
    .filter(key => allowedUpdates.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = updates[key];
      return obj;
    }, {});

  try {
    const user = await User.findByIdAndUpdate(
      req.user?.id,
      validUpdates,
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};
