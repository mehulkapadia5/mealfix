import { describe, expect, it } from 'vitest';
import { logFood, logSleep, uploadAttachment } from '../src/validation/schemas.js';
import { TextParser } from '../src/parsers/text.js';

describe('validation schemas', () => {
  it('accepts structured food logs', () => {
    const parsed = logFood.parse({ userId: '00000000-0000-0000-0000-000000000001', items: [{ foodName: 'eggs', quantity: 3, unit: 'count', protein: 18 }] });
    expect(parsed.items[0].foodName).toBe('eggs');
  });
  it('rejects malformed sleep logs', () => {
    expect(() => logSleep.parse({ userId: 'bad', bedtime: 'x', wakeTime: 'y' })).toThrow();
  });
  it('validates attachment uploads', () => {
    expect(uploadAttachment.parse({ userId: '00000000-0000-0000-0000-000000000001', attachmentType: 'zepp_screenshot', fileName: 'walk.png', contentType: 'image/png', base64: 'aGVsbG8=' }).attachmentType).toBe('zepp_screenshot');
  });
});

describe('TextParser', () => {
  it('detects natural-language weight', () => {
    expect(new TextParser().parse('Weight is 91.4 kg').intent).toBe('weight');
  });
});
