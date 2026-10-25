import { getAnimeListEnriched } from '@/actions/anime-list/getAnimeListEnriched';
import { getAnimeList } from '@/actions/anime-list/getAnimeList';
import { Anime, AnimeItem } from '@/types/anime/Anime';

jest.mock('@/actions/anime-list/getAnimeList');

const mockItems: AnimeItem[] = [
  {
    id: 1,
    title: 'First Anime',
    mainPicture: { medium: 'medium-1', large: 'large-1' },
    status: 'watching',
    score: 8,
    episodesWatched: 3,
    isRewatching: false,
  },
  {
    id: 2,
    title: 'Second Anime',
    mainPicture: { medium: 'medium-2', large: 'large-2' },
    status: 'completed',
    score: 9,
    episodesWatched: 12,
    isRewatching: false,
  },
];

const mockAnimeDetails: Anime[] = [
  {
    id: 101,
    malId: 1,
    title: { romaji: 'First Anime' },
    genres: ['Action', 'Adventure'],
    synonyms: [],
    season: 'WINTER',
    seasonYear: 2020,
    status: 'FINISHED',
  },
  {
    id: 102,
    malId: 2,
    title: { romaji: 'Second Anime' },
    genres: ['Comedy'],
    synonyms: [],
    season: 'FALL',
    seasonYear: 2023,
    status: 'RELEASING',
  },
];

describe('getAnimeListEnriched', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.BACKEND_URL = 'http://localhost:8080';
    global.fetch = jest.fn();
  });

  it('should enrich the list with a single batch request matched by MAL id', async () => {
    (getAnimeList as jest.Mock).mockResolvedValue({ animeList: mockItems });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnimeDetails,
    });

    const result = await getAnimeListEnriched('test-token');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const requestedUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(requestedUrl).toContain('/api/v1/anime/batch?');
    expect(requestedUrl).toContain('ids=1');
    expect(requestedUrl).toContain('ids=2');

    expect(result).toEqual({
      animeList: [
        {
          ...mockItems[0],
          genres: ['Action', 'Adventure'],
          season: 'WINTER',
          seasonYear: 2020,
          animeStatus: 'FINISHED',
        },
        {
          ...mockItems[1],
          genres: ['Comedy'],
          season: 'FALL',
          seasonYear: 2023,
          animeStatus: 'RELEASING',
        },
      ],
    });
  });
});
