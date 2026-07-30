import { eq, sql } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import type { Db } from '../db/client.js';
export class BaseService { constructor(protected db: Db) {} async softDelete(table: PgTable & { id: any; deletedAt: any }, id: string) { const [row] = await this.db.update(table).set({ deletedAt: sql`now()` } as any).where(eq(table.id, id)).returning({ id: table.id }); return row; } }
