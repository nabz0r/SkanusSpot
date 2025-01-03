import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const generateRefreshToken = () => uuidv4();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Créer un nouvel utilisateur
    const user = new User({
      email,
      password,
      name,
      refreshToken: generateRefreshToken()
    });

    await user.save();

    // Générer le token
    const token = user.generateAuthToken();

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token,
      refreshToken: user.refreshToken
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Vérifier si le compte est actif
    if (user.status !== 'active') {
      return res.status(401).json({ error: 'Account is not active.' });
    }

    // Mettre à jour le dernier login
    user.lastLogin = new Date();
    user.refreshToken = generateRefreshToken();
    await user.save();

    // Générer le token
    const token = user.generateAuthToken();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token,
      refreshToken: user.refreshToken
    });
  } catch (error) {
    res.status(500).json({ error: 'Login error.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }
    res.json({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Logout error.' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id)
      .select('-password -refreshToken')
      .populate('favorites');

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile.' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const updates = req.body;
  const allowedUpdates = ['name', 'preferences'];

  // Filtrer les champs autorisés
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
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile.' });
  }
};