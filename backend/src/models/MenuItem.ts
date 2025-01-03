import mongoose, { Document } from 'mongoose';

export interface IMenuItem extends Document {
  restaurant: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  price: number;
  photo?: string;
  available: boolean;
  preparationTime: number; // minutes
  allergens?: string[];
  options?: {
    name: string;
    required: boolean;
    multiple: boolean;
    choices: {
      name: string;
      price?: number;
    }[];
  }[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    halal: boolean;
    kosher: boolean;
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
  };
  popularity: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  photo: String,
  available: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    required: true,
    min: 1
  },
  allergens: [String],
  options: [{
    name: String,
    required: Boolean,
    multiple: Boolean,
    choices: [{
      name: String,
      price: Number
    }]
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    halal: {
      type: Boolean,
      default: true
    },
    kosher: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    glutenFree: Boolean
  },
  popularity: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index pour les recherches
menuItemSchema.index({ restaurant: 1, category: 1 });
menuItemSchema.index({ restaurant: 1, popularity: -1 });
menuItemSchema.index({ name: 'text', description: 'text' });

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);