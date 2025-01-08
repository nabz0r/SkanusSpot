interface IUser extends mongoose.Document {
  // ... existing fields ...
  subscription: {
    type: 'free' | 'premium';
    validUntil: Date;
  };
  cashback: {
    balance: number;
    history: {
      amount: number;
      date: Date;
      description: string;
    }[];
  };
}