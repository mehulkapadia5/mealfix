import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { createDb } from './client.js';
await migrate(createDb(), { migrationsFolder: 'drizzle' });
