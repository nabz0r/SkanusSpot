import mongoose from 'mongoose';

export interface IReview extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  rating: number;
  text: string;
  photos?: string[];
  likes: mongoose.Types.ObjectId[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  photos: [String],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
reviewSchema.index({ restaurant: 1, createdAt: -1 });

export const Review = mongoose.model<IReview>('Review', reviewSchema);