import { User } from '@/types/user/User';

describe('User Types', () => {
  it('should create valid User object', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      url: 'https://myanimelist.net/profile/Test User',
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

  it('should handle optional fields correctly', () => {
    const user: User = {
      id: 1,
      name: 'Test',
      url: 'https://myanimelist.net/profile/Test',
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
