# MealFix Coach MCP Server

Backend foundation for an AI-first nutrition and fitness coach. ChatGPT or another MCP client sends structured tool calls to this server; tools validate with Zod and delegate all persistence to service classes. Tools never execute SQL directly.

## Features

- MCP tools: `log_food`, `log_strength_workout`, `log_cardio`, `log_sleep`, `log_weight`, `upload_attachment`, `attach_image`, `get_today_summary`, `get_recent_logs`, `update_log`, and `delete_log`.
- PostgreSQL/Supabase schema for food, workouts, cardio, sleep, weight, and attachments.
- Supabase Storage bucket migration for uploaded meal, Zepp, and progress images.
- Service layer with transactional inserts for nested food and workout data.
- Zod validation, typed DTOs, parser separation, structured invocation logging, soft deletes.

## Local Development

```bash
cp .env.example .env
npm install
npm run build
npm test
npm run dev
```

## Database

Apply `supabase/migrations/0001_mealfix_ingestion.sql` to create tables, enums, indexes, and the private `mealfix-attachments` storage bucket. Optional seed data lives in `supabase/seed/seed.sql`.

## Example Tool Invocations

### Food
```json
{"userId":"00000000-0000-0000-0000-000000000001","mealType":"breakfast","source":"ai_text","items":[{"foodName":"eggs","quantity":3,"unit":"count","calories":210,"protein":18},{"foodName":"protein bread","quantity":2,"unit":"slice","calories":140,"protein":10,"carbs":20}]}
```

### Strength workout
```json
{"userId":"00000000-0000-0000-0000-000000000001","workoutType":"gym","source":"ai_text","notes":"Push Day","exercises":[{"exerciseName":"Bench Press","orderIndex":0,"sets":[{"setNumber":1,"weight":20,"reps":12},{"setNumber":2,"weight":40,"reps":10}]}]}
```

### Cardio from Zepp
```json
{"userId":"00000000-0000-0000-0000-000000000001","workoutType":"walk","activity":"walk","durationMinutes":45,"distance":4.2,"steps":6100,"pace":"10:42/km","averageHr":118,"caloriesBurned":260,"source":"image"}
```
