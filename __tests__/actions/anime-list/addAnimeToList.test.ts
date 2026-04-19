import { addAnimeToList } from '@/actions/anime-list/addAnimeToList';
import { AnimeStatus } from '@/types/anime/Anime';

const mockAnimeStatus: AnimeStatus = {
  status: 'watching',
  score: 8,
  numEpisodes: 5,
  rewatching: false,
};

describe('addAnimeToList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  it('should add anime to list successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnimeStatus,
    });

    const result = await addAnimeToList('test-token', 1);

    expect(result).toEqual(mockAnimeStatus);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/animeList/1'),
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'access_token=test-token',
        },
      })
    );
  });

  it('should return null when request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    const result = await addAnimeToList('invalid-token', 1);

    expect(result).toBeNull();
  });

  it('should return null on network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await addAnimeToList('test-token', 1);

    expect(result).toBeNull();
  });

  it('should return null when BACKEND_URL is not defined', async () => {
    const originalUrl = process.env.BACKEND_URL;
    process.env.BACKEND_URL = '';

    const result = await addAnimeToList('test-token', 1);

    expect(result).toBeNull();

    process.env.BACKEND_URL = originalUrl;
  });
});
