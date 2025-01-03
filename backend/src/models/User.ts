import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Interface OAuth pour les connexions sociales
 */
interface OAuthProfile {
  id: string;
  accessToken: string;
  refreshToken?: string;
  email?: string;
  name?: string;
}

/**
 * Interface utilisateur étendue avec OAuth
 */
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
  preferences?: {
    dietary: string[];
    cuisinePreferences: string[];
  };
  favorites: string[];
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'banned';
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'restaurant_owner'],
    default: 'user'
  },
  profilePicture: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  oauth: {
    google: {
      id: String,
      accessToken: String,
      refreshToken: String,
      email: String,
      name: String
    },
    facebook: {
      id: String,
      accessToken: String,
      refreshToken: String,
      email: String,
      name: String
    }
  },
  preferences: {
    dietary: [String],
    cuisinePreferences: [String]
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  lastLogin: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  refreshToken: String
}, {
  timestamps: true
});

// Hash password avant sauvegarde si modifié
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Générer JWT token
userSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role,
      email: this.email
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );
};

// Générer Refresh token
userSchema.methods.generateRefreshToken = function(): string {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
    { expiresIn: '7d' }
  );
};

export const User = mongoose.model<IUser>('User', userSchema);