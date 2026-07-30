import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
export const createDb = (url = process.env.DATABASE_URL ?? '') => {
  if (!url) throw new Error('DATABASE_URL is required');
  return drizzle(postgres(url, { max: 10 }), { schema });
};
export type Db = ReturnType<typeof createDb>;
