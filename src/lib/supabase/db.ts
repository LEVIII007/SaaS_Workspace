import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

console.log('Loading environment variables from .env file');
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  console.log('🔴 No database URL found in environment variables');
} else {
  console.log('Database URL found:', process.env.DATABASE_URL);
}

console.log('Creating PostgreSQL client');
const client = postgres(process.env.DATABASE_URL as string, { max: 1 });

console.log('Initializing drizzle ORM with schema');
const db = drizzle(client, { schema });

/*
const migrateDb = async () => {
  try {
    console.log('🟠 Migrating database');
    await migrate(db, { migrationsFolder: 'migrations' });
    console.log('🟢 Successfully migrated database');
  } catch (error) {
    console.log('🔴 Error migrating database:', error);
  }
};
migrateDb();
*/

console.log('Database setup complete');
export default db;