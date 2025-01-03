import mongoose, { Document } from 'mongoose';

interface IOrderItem {
  menuItem: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  specialInstructions?: string;
  options?: {
    name: string;
    value: string;
    price?: number;
  }[];
}

interface IPayment {
  method: 'card' | 'cash' | 'online';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  amount: number;
  currency: string;
  refundReason?: string;
}

interface IDeliveryInfo {
  address: {
    street: string;
    city: string;
    postalCode: string;
    building?: string;
    apartment?: string;
    floor?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  instructions?: string;
  estimatedTime?: Date;
  actualTime?: Date;
  driver?: {
    name: string;
    phone: string;
  };
}

export interface IOrder extends Document {
  restaurant: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  type: 'delivery' | 'pickup' | 'dineIn';
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee?: number;
  tip?: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'completed' | 'cancelled';
  payment: IPayment;
  delivery?: IDeliveryInfo;
  scheduledFor?: Date;
  specialInstructions?: string;
  rating?: {
    score: number;
    comment?: string;
    createdAt: Date;
  };
  timeline: {
    event: string;
    timestamp: Date;
    note?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['delivery', 'pickup', 'dineIn'],
    required: true
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    specialInstructions: String,
    options: [{
      name: String,
      value: String,
      price: Number
    }]
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    min: 0
  },
  tip: {
    type: Number,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'cash', 'online'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'EUR'
    },
    refundReason: String
  },
  delivery: {
    address: {
      street: String,
      city: String,
      postalCode: String,
      building: String,
      apartment: String,
      floor: String
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    instructions: String,
    estimatedTime: Date,
    actualTime: Date,
    driver: {
      name: String,
      phone: String
    }
  },
  scheduledFor: Date,
  specialInstructions: String,
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: Date
  },
  timeline: [{
    event: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }]
}, {
  timestamps: true
});

// Middleware pour mettre à jour le timeline
orderSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.timeline.push({
      event: `Status changed to ${this.status}`,
      timestamp: new Date()
    });
  }
  next();
});

// Index pour les recherches fréquentes
orderSchema.index({ restaurant: 1, status: 1, createdAt: -1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });

// Index géospatial pour les livraisons
orderSchema.index({ 'delivery.coordinates': '2dsphere' });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
