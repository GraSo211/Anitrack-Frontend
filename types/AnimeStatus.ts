export type AnimeStatusType =
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch";

export type AnimeStatus = {
  status: AnimeStatusType|null;
  score: number;
  numEpisodes: number;
  rewatching: boolean;
};