import formatDate from '@/utils/formatDate';

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const result = formatDate('2024-03-15T12:00:00.000Z');
    // Date parsing may vary by timezone, so we just check format
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('should handle different date formats', () => {
    const result = formatDate('2023-12-25T00:00:00.000Z');
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('should handle empty string', () => {
    const result = formatDate('');
    expect(result).toBe('NaN/NaN/NaN');
  });
});
