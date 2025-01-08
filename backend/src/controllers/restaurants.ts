import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { dietary } = req.query;
    const filters: any = {};

    if (dietary) {
      filters[`dietaryOptions.${dietary}`] = true;
    }

    const restaurants = await Restaurant.find(filters);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurants' });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurant' });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      owner: req.user?.id
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error creating restaurant' });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user?.id },
      req.body,
      { new: true }
    );
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error updating restaurant' });
  }
};