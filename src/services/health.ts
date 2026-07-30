import { weightLogs, sleepLogs } from '../db/schema.js';
import type { Db } from '../db/client.js';
import type { z } from 'zod';
import type { logSleep, logWeight } from '../validation/schemas.js';
import { minutesBetween } from '../utils.js';
export class SleepService { constructor(private db: Db) {} async logSleep(input: z.infer<typeof logSleep>) { const duration = input.duration ?? minutesBetween(input.bedtime, input.wakeTime); const [row] = await this.db.insert(sleepLogs).values({ ...input, duration, bedtime: new Date(input.bedtime), wakeTime: new Date(input.wakeTime) } as any).returning({ id: sleepLogs.id }); return { sleepLogId: row.id, rowsInserted: 1 }; } }
export class WeightService { constructor(private db: Db) {} async logWeight(input: z.infer<typeof logWeight>) { const [row] = await this.db.insert(weightLogs).values(input as any).returning({ id: weightLogs.id }); return { weightLogId: row.id, rowsInserted: 1 }; } }
