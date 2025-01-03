import { Request, Response } from 'express';
import { User } from '../models/User';

/**
 * Contrôleur pour la gestion de l'authentification OAuth
 * Gère les callbacks et la génération des tokens après
 * une authentification sociale réussie
 */

/**
 * Gère le callback après une authentification OAuth réussie
 * Génère les tokens JWT et refresh pour l'utilisateur
 */
export const handleOAuthCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Générer les tokens
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Mettre à jour le refresh token en base
    user.refreshToken = refreshToken;
    await user.save();

    // Rediriger vers le frontend avec les tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(
      `${frontendUrl}/auth/callback?token=${token}&refreshToken=${refreshToken}`
    );
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
};

/**
 * Renvoie la liste des providers OAuth disponibles
 * Utilisé par le frontend pour afficher les boutons de login appropriés
 */
export const getOAuthProviders = async (req: Request, res: Response) => {
  const providers = [
    {
      name: 'google',
      active: true,
      clientId: process.env.GOOGLE_CLIENT_ID ? true : false
    }
    // Ajouter d'autres providers ici quand ils seront implémentés
  ];

  res.json({
    providers: providers.filter(p => p.active)
  });
};