import { attachments } from '../db/schema.js';
import type { Db } from '../db/client.js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { z } from 'zod';
import type { attachImage, uploadAttachment } from '../validation/schemas.js';
import { eq } from 'drizzle-orm';
export class AttachmentService { constructor(private db: Db, private supabase: SupabaseClient) {} async uploadAttachment(input: z.infer<typeof uploadAttachment>) { const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'mealfix-attachments'; const storagePath = `${input.userId}/${input.attachmentType}/${crypto.randomUUID()}-${input.fileName}`; const { error } = await this.supabase.storage.from(bucket).upload(storagePath, Buffer.from(input.base64, 'base64'), { contentType: input.contentType, upsert: false }); if (error) throw new Error(`Storage upload failed: ${error.message}`); const [row] = await this.db.insert(attachments).values({ userId: input.userId, attachmentType: input.attachmentType, storagePath }).returning({ id: attachments.id }); return { attachmentId: row.id, storagePath, rowsInserted: 1 }; }
 async attachImage(input: z.infer<typeof attachImage>) { const [row] = await this.db.update(attachments).set({ linkedTable: input.linkedTable, linkedRecordId: input.linkedRecordId } as any).where(eq(attachments.id, input.attachmentId)).returning({ id: attachments.id }); return { attachmentId: row.id, rowsInserted: 0 }; } }
