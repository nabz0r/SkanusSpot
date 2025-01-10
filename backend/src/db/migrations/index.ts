import mongoose from 'mongoose';
import initialSchema from './001_initial_schema';

const migrations = [
  initialSchema
];

export const runMigrations = async () => {
  try {
    for (const migration of migrations) {
      await migration.up();
      console.log('✅ Migration completed successfully');
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

export const rollbackMigrations = async () => {
  try {
    for (const migration of migrations.reverse()) {
      await migration.down();
      console.log('✅ Rollback completed successfully');
    }
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  }
};