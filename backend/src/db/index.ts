import mongoose from 'mongoose';
import { runMigrations } from './migrations';
import seedRestaurants from './seeds/restaurants';

export const initializeDatabase = async () => {
  try {
    // Run migrations
    await runMigrations();
    
    // Seed data if in development environment
    if (process.env.NODE_ENV === 'development') {
      await seedRestaurants();
    }
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};