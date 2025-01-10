import mongoose from 'mongoose';

const up = async () => {
  // Restaurant Schema
  const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cuisine: [{ type: String }],
    certifications: {
      halal: { type: Boolean, default: false },
      kosher: { type: Boolean, default: false },
      vegan: { type: Boolean, default: false },
      vegetarian: { type: Boolean, default: false }
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [longitude, latitude]
      }
    },
    contacts: {
      phone: String,
      email: String,
      website: String
    },
    openingHours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String
    },
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        default: 'free'
      },
      startDate: Date,
      endDate: Date,
      features: [String]
    },
    placement: {
      priority: { type: Number, default: 0 },
      promoted: { type: Boolean, default: false }
    },
    commissionRate: { type: Number, default: 0 }
  });

  // Add geospatial index
  restaurantSchema.index({ 'location.coordinates': '2dsphere' });

  // Create collection
  await mongoose.connection.createCollection('restaurants');
};

const down = async () => {
  // Drop collections
  await mongoose.connection.dropCollection('restaurants');
};

export default { up, down };