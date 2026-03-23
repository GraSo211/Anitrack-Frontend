export type AnimeList = {
  animeList: AnimeItem[];
};

export type AnimeItem = {
  id: number;
  title: string;
  mainPicture: Picture;
  status: Status;
  score: number;
  episodesWatched: number | null;
  isRewatching: boolean;
};

export type Picture = {
  medium: string;
  large: string;
};

export type Status =
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch"
  | "";