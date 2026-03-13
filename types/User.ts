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