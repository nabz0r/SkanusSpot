interface IRestaurant extends mongoose.Document {
  name: string;
  // ... existing fields ...
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    startDate: Date;
    endDate: Date;
    features: string[];
  };
  placement: {
    priority: number;
    promoted: boolean;
  };
  commissionRate: number;
}