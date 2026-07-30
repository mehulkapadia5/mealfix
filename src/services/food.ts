import { sum } from '../utils.js';
import { foodItems, foodLogs } from '../db/schema.js';
import type { Db } from '../db/client.js';
import type { LogFoodInput } from '../validation/schemas.js';
export class FoodService { constructor(private db: Db) {} async logFood(input: LogFoodInput) { return this.db.transaction(async tx => { const totals = { totalCalories: sum(input.items,'calories'), totalProtein: sum(input.items,'protein'), totalCarbs: sum(input.items,'carbs'), totalFat: sum(input.items,'fat'), totalFiber: sum(input.items,'fiber') }; const [log] = await tx.insert(foodLogs).values({ userId: input.userId, mealType: input.mealType, notes: input.notes, source: input.source, ...totals } as any).returning({ id: foodLogs.id }); const itemRows = await tx.insert(foodItems).values(input.items.map(i => ({ foodLogId: log.id, ...i } as any))).returning({ id: foodItems.id }); return { foodLogId: log.id, foodItemIds: itemRows.map(i=>i.id), rowsInserted: 1 + itemRows.length }; }); } }
