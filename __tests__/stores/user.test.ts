import { useUserStore } from '@/stores/user';
import { User } from '@/types/user/User';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  picture: 'https://example.com/avatar.jpg',
  gender: 'Male',
  birthday: '1990-01-01',
  location: 'Spain',
  joinedAt: '2024-01-01',
  timeZone: 'Europe/Madrid',
  statistics: {
    numWatching: 10,
    numCompleted: 50,
    numOnHold: 5,
    numDropped: 3,
    numPlanToWatch: 20,
    numTotal: 88,
    daysWatched: 100,
    daysWatching: 10,
    daysCompleted: 80,
    daysOnHold: 5,
    daysDropped: 3,
    daysTotal: 98,
    episodesWatched: 1500,
    timesRewatched: 5,
    meanScore: 7.5,
  },
};

describe('User Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { removeUser } = useUserStore.getState();
    removeUser();
  });

  it('should have initial state with user as null', () => {
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
  });

  it('should set user', () => {
    const { setUser } = useUserStore.getState();
    setUser(mockUser);

    expect(useUserStore.getState().user).toEqual(mockUser);
  });

  it('should update user properties', () => {
    const { setUser } = useUserStore.getState();
    setUser(mockUser);

    const updatedUser = { ...mockUser, name: 'Updated Name' };
    setUser(updatedUser);

    expect(useUserStore.getState().user?.name).toBe('Updated Name');
  });

  it('should remove user', () => {
    const { setUser, removeUser } = useUserStore.getState();
    setUser(mockUser);
    expect(useUserStore.getState().user).not.toBeNull();

    removeUser();
    expect(useUserStore.getState().user).toBeNull();
  });

  it('should handle multiple set and remove operations', () => {
    const { setUser, removeUser } = useUserStore.getState();

    setUser(mockUser);
    expect(useUserStore.getState().user).toEqual(mockUser);

    removeUser();
    expect(useUserStore.getState().user).toBeNull();

    setUser(mockUser);
    expect(useUserStore.getState().user).toEqual(mockUser);
  });
});
