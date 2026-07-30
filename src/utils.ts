export const sum = <T extends Record<string, unknown>>(items: T[], key: keyof T) => items.reduce((n, i) => n + (typeof i[key] === 'number' ? i[key] as number : 0), 0).toString();
export const minutesBetween = (start: string, end: string) => Math.max(1, Math.round((Date.parse(end)-Date.parse(start))/60000));
