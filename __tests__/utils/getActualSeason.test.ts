import { getActualSeason } from '@/utils/getActualSeason';

describe('getActualSeason', () => {
  it('should return a valid season string', () => {
    const result = getActualSeason();
    expect(['WINTER', 'SPRING', 'SUMMER', 'FALL']).toContain(result);
  });

  it('should return string type', () => {
    const result = getActualSeason();
    expect(typeof result).toBe('string');
  });
});
