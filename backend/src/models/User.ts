import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface OAuthProfile {
  id: string;
  accessToken: string;
  refreshToken?: string;
  email?: string;
  name?: string;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin' | 'restaurant_owner';
  profilePicture?: string;
  emailVerified: boolean;
  oauth: {
    google?: OAuthProfile;
    facebook?: OAuthProfile;
  };
  preferences: {
    dietary: Array<'halal' | 'kosher' | 'vegan' | 'vegetarian'>;
    cuisinePreferences: string[];
  };
  favorites: string[];
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'banned';
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema({
  // [Autres champs existants...]
  preferences: {
    dietary: [{
      type: String,
      enum: ['halal', 'kosher', 'vegan', 'vegetarian']
    }],
    cuisinePreferences: [String]
  }
}, {
  timestamps: true
});

// [Méthodes existantes...]

export const User = mongoose.model<IUser>('User', userSchema);