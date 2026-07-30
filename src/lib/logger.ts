export async function instrument<T>(tool: string, run: () => Promise<T & { rowsInserted?: number }>): Promise<T> {
  const started = Date.now();
  try { const result = await run(); console.info(JSON.stringify({ tool, success: true, executionMs: Date.now()-started, rowsInserted: result.rowsInserted ?? 0 })); return result; }
  catch (error) { console.error(JSON.stringify({ tool, success: false, executionMs: Date.now()-started, error: error instanceof Error ? error.message : String(error) })); throw error; }
}
