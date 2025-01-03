import mongoose, { Document } from 'mongoose';

export interface IBooking extends Document {
  restaurant: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  tableAssignment?: string;
  preOrders?: {
    menuItem: mongoose.Types.ObjectId;
    quantity: number;
    specialInstructions?: string;
  }[];
  notifications: {
    confirmationSent: boolean;
    reminderSent: boolean;
  };
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Time format must be HH:MM'
    }
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: [1, 'At least one guest required'],
    max: [20, 'Maximum 20 guests allowed']
  },
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  tableAssignment: String,
  preOrders: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    specialInstructions: String
  }],
  notifications: {
    confirmationSent: {
      type: Boolean,
      default: false
    },
    reminderSent: {
      type: Boolean,
      default: false
    }
  },
  cancelReason: String
}, {
  timestamps: true
});

// Index pour recherches fréquentes
bookingSchema.index({ restaurant: 1, date: 1, status: 1 });
bookingSchema.index({ user: 1, status: 1 });

// Index TTL pour nettoyer les réservations expirées
bookingSchema.index({ date: 1 }, { expireAfterSeconds: 7776000 }); // 90 jours

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);