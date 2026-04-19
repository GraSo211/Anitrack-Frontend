import { Anime, AnimeCard, Status } from '@/types/anime/Anime';

describe('Anime Types', () => {
  it('should create valid Anime object', () => {
    const anime: Anime = {
      id: 1,
      malId: 5114,
      title: { romaji: 'Test', english: 'Test English' },
      genres: ['Action'],
      synonyms: [],
    };

    expect(anime.id).toBe(1);
    expect(anime.title.romaji).toBe('Test');
  });

  it('should create valid AnimeCard object', () => {
    const animeCard: AnimeCard = {
      id: 1,
      title: { romaji: 'Test' },
      coverImage: { large: 'https://test.jpg' },
    };

    expect(animeCard.id).toBe(1);
    expect(animeCard.coverImage.large).toBe('https://test.jpg');
  });

  it('should accept valid Status values', () => {
    const statuses: Status[] = [
      'watching',
      'completed',
      'on_hold',
      'dropped',
      'plan_to_watch',
    ];

    statuses.forEach((status) => {
      expect(['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']).toContain(status);
    });
  });
});
