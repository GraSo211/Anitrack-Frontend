export type User = {
  id: number;
  name: string;
  picture: string | null;
  gender: string | null;
  birthday: string | null;
  location: string | null;
  joinedAt: string | null;
  timeZone: string | null;

  statistics: {
    numWatching: number;
    numCompleted: number;
    numOnHold: number;
    numDropped: number;
    numPlanToWatch: number;
    numTotal: number;

    daysWatched: number;
    daysWatching: number;
    daysCompleted: number;
    daysOnHold: number;
    daysDropped: number;
    daysTotal: number;

    episodesWatched: number;
    timesRewatched: number;
    meanScore: number;
  };
};

export type UserJikan = {
  malId: number;
  username: string;
  url: string;
  imageUrl: string;
  lastOnline: string;
  gender: string | null;
  birthday: string | null;
  location: string | null;
  joined: string;

  statistics: {
    daysWatched: number;
    meanScore: number;
    watching: number;
    completed: number;
    onHold: number;
    dropped: number;
    planToWatch: number;
    totalEntries: number;
    rewatched: number;
    episodesWatched: number;
  };

  external: {
    name: string;
    url: string;
  }[];
};

export type UserRandom = {
    profileUrl: string;
    username: string;
    imageUrl: string;
    lastOnline: string;
}