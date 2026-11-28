export type ImportPhase = "PARSING" | "RESOLVING" | "PREVIEW_READY" | "SYNCING" | "DONE" | "CANCELLED" | "FAILED";

export type RowStatus = "READY" | "AMBIGUOUS" | "NOT_FOUND" | "INVALID" | "PENDING" | "SYNCED" | "PARTIAL" | "FAILED";

export type Candidate = {
  malId: number; title: string; mediaType: string; episodes: number | null;
  startDate: string | null; image: string | null;
};

export type SeasonPreview = {
  malId: number; title: string; order: number; episodes: number | null; image: string | null;
  score: number; selected: boolean;
  existing: { status: string; score: number; numEpisodesWatched: number } | null;
  action: "CREATE" | "UPDATE" | "KEEP" | "SKIP" | "PENDING";
  error: string | null;
};

export type PreviewRow = {
  rowNumber: number; title: string; status: RowStatus; message: string | null;
  candidates: Candidate[]; seasons: SeasonPreview[];
};

export type ImportJobView = {
  jobId: string; phase: ImportPhase;
  progress: { done: number; total: number; current: string | null };
  rows: PreviewRow[];
  counts: { rows: number; seasonsToSync: number; conflicts: number; unresolved: number; synced: number; skipped: number; failed: number };
  error: string | null;
  createdAt: string;
};
