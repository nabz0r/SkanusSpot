import express from 'express';
import passport from 'passport';
import { handleOAuthCallback, getOAuthProviders } from '../controllers/oauth';

const router = express.Router();

/**
 * Routes OAuth pour l'authentification sociale
 * Supporte actuellement:
 * - Google OAuth2
 * Prévu:
 * - Facebook
 * - Apple Sign In
 */

// Route pour obtenir les providers OAuth disponibles
router.get('/providers', getOAuthProviders);

// Routes Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  handleOAuthCallback
);

export default router;