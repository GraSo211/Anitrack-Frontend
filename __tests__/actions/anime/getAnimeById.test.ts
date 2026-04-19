import { getAnimeById } from '@/actions/anime/getAnimeById';
import { Anime } from '@/types/anime/Anime';

const mockAnime: Anime = {
  id: 1,
  malId: 5114,
  title: {
    romaji: 'Fullmetal Alchemist: Brotherhood',
    english: 'Fullmetal Alchemist: Brotherhood',
  },
  status: 'FINISHED',
  description: 'The story follows two brothers...',
  startDate: { year: 2009, month: 4, day: 5 },
  endDate: { year: 2010, month: 7, day: 4 },
  season: 'SPRING',
  seasonYear: 2009,
  episodes: 64,
  duration: 24,
  countryOfOrigin: 'JP',
  source: 'MANGA',
  trailer: {
    id: '--IcmZkvE0',
    site: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/--IcmZkvE0/0.jpg',
  },
  coverImage: {
    extraLarge: 'https://s4.anilist.co/...',
    large: 'https://s4.anilist.co/...',
    medium: 'https://s4.anilist.co/...',
    color: '#f5d742',
  },
  bannerImage: 'https://s4.anilist.co/...',
  genres: ['Action', 'Adventure', 'Drama'],
  synonyms: ['FMAB'],
  averageScore: 88,
  popularity: 120000,
  studio: 'BONES',
  isAdult: false,
};

describe('getAnimeById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  it('should fetch anime by id successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnime,
    });

    const result = await getAnimeById(1);

    expect(result).toEqual(mockAnime);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/anime/1'),
      expect.objectContaining({
        method: 'GET',
        next: { revalidate: 86400 },
      })
    );
  });

  it('should return null when anime not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getAnimeById(999);

    expect(result).toBeNull();
  });

  it('should return null on network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await getAnimeById(1);

    expect(result).toBeNull();
  });

  it('should return null when BACKEND_URL is not defined', async () => {
    const originalUrl = process.env.BACKEND_URL;
    process.env.BACKEND_URL = '';

    const result = await getAnimeById(1);

    expect(result).toBeNull();

    process.env.BACKEND_URL = originalUrl;
  });

  it('should call correct endpoint', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnime,
    });

    await getAnimeById(123);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/anime/123',
      expect.any(Object)
    );
  });
});
