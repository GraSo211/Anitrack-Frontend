export type AnimeStatusType =
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch"
  | "none";

export type AnimeStatus = {
  status: AnimeStatusType;
  score: number;
  numEpisodes: number;
  rewatching: boolean;
};