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