import { User, UserJikan } from '@/types/user/User';

describe('User Types', () => {
  it('should create valid User object', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      picture: null,
      gender: 'Male',
      birthday: null,
      location: null,
      joinedAt: null,
      timeZone: null,
      statistics: {
        numWatching: 0,
        numCompleted: 0,
        numOnHold: 0,
        numDropped: 0,
        numPlanToWatch: 0,
        numTotal: 0,
        daysWatched: 0,
        daysWatching: 0,
        daysCompleted: 0,
        daysOnHold: 0,
        daysDropped: 0,
        daysTotal: 0,
        episodesWatched: 0,
        timesRewatched: 0,
        meanScore: 0,
      },
    };

    expect(user.name).toBe('Test User');
    expect(user.statistics.numTotal).toBe(0);
  });

  it('should create valid UserJikan object', () => {
    const userJikan: UserJikan = {
      malId: 123,
      username: 'Test',
      url: 'https://myanimelist.net/...',
      imageUrl: 'https://cdn.myanimelist.net/...',
      lastOnline: '2024-01-01',
      gender: 'Male',
      birthday: '1990-01-01',
      location: 'Japan',
      joined: '2020-01-01',
      statistics: {
        daysWatched: 100,
        meanScore: 7.5,
        watching: 10,
        completed: 50,
        onHold: 5,
        dropped: 3,
        planToWatch: 20,
        totalEntries: 88,
        rewatched: 5,
        episodesWatched: 1500,
      },
      external: [],
    };

    expect(userJikan.username).toBe('Test');
    expect(userJikan.statistics.totalEntries).toBe(88);
  });

  it('should handle optional fields correctly', () => {
    const user: User = {
      id: 1,
      name: 'Test',
      picture: null,
      gender: null,
      birthday: null,
      location: null,
      joinedAt: null,
      timeZone: null,
      statistics: {
        numWatching: 0,
        numCompleted: 0,
        numOnHold: 0,
        numDropped: 0,
        numPlanToWatch: 0,
        numTotal: 0,
        daysWatched: 0,
        daysWatching: 0,
        daysCompleted: 0,
        daysOnHold: 0,
        daysDropped: 0,
        daysTotal: 0,
        episodesWatched: 0,
        timesRewatched: 0,
        meanScore: 0,
      },
    };

    expect(user.gender).toBeNull();
    expect(user.picture).toBeNull();
  });
});
