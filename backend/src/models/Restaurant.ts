import mongoose, { Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  type: 'halal' | 'kosher';
  description: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  certifications: string[];
  cuisine: string[];
  priceRange: '€' | '€€' | '€€€';
  openingHours: {
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }[];
  specialHours: {
    date: Date;
    open: string;
    close: string;
    closed: boolean;
    description: string;
  }[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  delivery: {
    available: boolean;
    platforms?: string[];
    minimumOrder?: number;
    radius?: number;
  };
  features: string[];
  rating: {
    average: number;
    count: number;
  };
  photos: string[];
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
      photo?: string;
      allergens?: string[];
      spicy?: boolean;
      vegan?: boolean;
      popular?: boolean;
    }[];
  }[];
  status: 'active' | 'inactive' | 'pending';
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['halal', 'kosher'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  certifications: [String],
  cuisine: [String],
  priceRange: {
    type: String,
    enum: ['€', '€€', '€€€'],
    default: '€€'
  },
  openingHours: [{
    day: String,
    open: String,
    close: String,
    closed: Boolean
  }],
  specialHours: [{
    date: Date,
    open: String,
    close: String,
    closed: Boolean,
    description: String
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  },
  delivery: {
    available: {
      type: Boolean,
      default: false
    },
    platforms: [String],
    minimumOrder: Number,
    radius: Number
  },
  features: [String],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  photos: [String],
  menu: [{
    category: String,
    items: [{
      name: String,
      description: String,
      price: Number,
      photo: String,
      allergens: [String],
      spicy: Boolean,
      vegan: Boolean,
      popular: Boolean
    }]
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index géospatial pour les recherches par localisation
restaurantSchema.index({ location: '2dsphere' });

// Index texte pour la recherche full-text
restaurantSchema.index({
  name: 'text',
  'menu.items.name': 'text',
  description: 'text'
}, {
  weights: {
    name: 10,
    'menu.items.name': 5,
    description: 3
  }
});

// Index composés pour les filtres courants
restaurantSchema.index({ type: 1, status: 1, 'rating.average': -1 });
restaurantSchema.index({ cuisine: 1, priceRange: 1 });

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);