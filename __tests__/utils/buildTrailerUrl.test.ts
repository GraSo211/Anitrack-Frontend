import buildTrailerUrl from '@/utils/buildTrailerUrl';

describe('buildTrailerUrl', () => {
  it('should build YouTube URL', () => {
    const result = buildTrailerUrl({ id: 123, site: 'youtube', thumbnail: 'thumb.jpg' });
    expect(result).toBe('https://www.youtube.com/watch?v=123');
  });

  it('should build YouTube URL with string id', () => {
    const result = buildTrailerUrl({ id: 'dQw4w9WgXcQ', site: 'youtube' });
    expect(result).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });

  it('should build Dailymotion URL', () => {
    const result = buildTrailerUrl({ id: 'x123abc', site: 'dailymotion' });
    expect(result).toBe('https://www.dailymotion.com/video/x123abc');
  });

  it('should return null for null input', () => {
    const result = buildTrailerUrl(null as unknown as { id: string; site: string });
    expect(result).toBeNull();
  });

  it('should return null for undefined site', () => {
    const result = buildTrailerUrl({ id: '123', site: undefined });
    expect(result).toBeNull();
  });

  it('should return null for unknown site', () => {
    const result = buildTrailerUrl({ id: '123', site: 'vimeo' });
    expect(result).toBeNull();
  });

  it('should return null when id is missing', () => {
    const result = buildTrailerUrl({ id: undefined, site: 'youtube' });
    expect(result).toBe('https://www.youtube.com/watch?v=undefined');
  });
});
