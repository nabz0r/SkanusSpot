import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/User';

/**
 * Configuration Passport.js pour l'authentification
 * Supporte:
 * - JWT pour l'authentification API
 * - Google OAuth2 pour le login social
 */

// Configuration JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key'
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Configuration Google OAuth2 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({
          'oauth.google.id': profile.id
        });

        if (user) {
          // Mettre à jour les informations si nécessaire
          user.oauth.google.accessToken = accessToken;
          if (refreshToken) user.oauth.google.refreshToken = refreshToken;
          await user.save();
          return done(null, user);
        }

        // Créer un nouvel utilisateur
        user = new User({
          email: profile.emails?.[0].value,
          name: profile.displayName,
          password: Math.random().toString(36), // Mot de passe aléatoire
          oauth: {
            google: {
              id: profile.id,
              accessToken,
              refreshToken
            }
          },
          emailVerified: true // Email vérifié par Google
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;