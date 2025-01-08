import mongoose from 'mongoose';

export interface IRestaurant extends mongoose.Document {
  name: string;
  location: {
    coordinates: [number, number];
    address: string;
  };
  dietaryOptions: {
    halal: boolean;
    kosher: boolean;
    vegan: boolean;
    vegetarian: boolean;
  };
  menu: {
    name: string;
    price: number;
    dietary: {
      halal: boolean;
      kosher: boolean;
      vegan: boolean;
      vegetarian: boolean;
    };
  }[];
  rating: number;
  owner: mongoose.Types.ObjectId;
}

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true }
  },
  dietaryOptions: {
    halal: { type: Boolean, default: false },
    kosher: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false }
  },
  menu: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    dietary: {
      halal: { type: Boolean, default: false },
      kosher: { type: Boolean, default: false },
      vegan: { type: Boolean, default: false },
      vegetarian: { type: Boolean, default: false }
    }
  }],
  rating: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

restaurantSchema.index({ 'location.coordinates': '2dsphere' });

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);