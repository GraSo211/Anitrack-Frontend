import { EnrichedAnimeItem } from "@/actions/anime-list/getAnimeListEnriched";
import { User } from "@/types/user/User";

const MONTH_NAMES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatBirthday(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  let month = 0;
  let day = 0;

  const withSeparator = trimmed.match(/^(\d{1,2})[-/](\d{1,2})$/);
  const fullDate = trimmed.match(/^\d{4}-(\d{1,2})-(\d{1,2})/);
  if (withSeparator) {
    month = parseInt(withSeparator[1], 10);
    day = parseInt(withSeparator[2], 10);
  } else if (fullDate) {
    month = parseInt(fullDate[1], 10);
    day = parseInt(fullDate[2], 10);
  } else if (/^\d{4}$/.test(trimmed)) {
    month = parseInt(trimmed.slice(0, 2), 10);
    day = parseInt(trimmed.slice(2, 4), 10);
  } else {
    return null;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `${day} de ${MONTH_NAMES[month - 1]}`;
}

export function humanizedDays(days: number): string {
  if (days <= 0) return "0 meses";
  if (days >= 365) {
    const years = Math.round(days / 365);
    return `≈ ${years} ${years === 1 ? "año" : "años"}`;
  }
  const months = Math.max(1, Math.round(days / 30.44));
  return `≈ ${months} ${months === 1 ? "mes" : "meses"}`;
}

export type StatusDistributionItem = {
  status: string;
  label: string;
  count: number;
  percent: number;
  bgClass: string;
};

const STATUS_ROWS = [
  {
    status: "watching",
    label: "Viendo",
    bgClass: "bg-accent-primary",
    key: "numWatching" as const,
  },
  {
    status: "completed",
    label: "Completado",
    bgClass: "bg-status-success",
    key: "numCompleted" as const,
  },
  {
    status: "on_hold",
    label: "En espera",
    bgClass: "bg-status-warning",
    key: "numOnHold" as const,
  },
  {
    status: "dropped",
    label: "Abandonado",
    bgClass: "bg-status-error",
    key: "numDropped" as const,
  },
  {
    status: "plan_to_watch",
    label: "Planeado",
    bgClass: "bg-accent-tertiary",
    key: "numPlanToWatch" as const,
  },
];

export function statusDistribution(
  stats: NonNullable<User["statistics"]>
): StatusDistributionItem[] {
  const total = stats.numTotal || 1;
  return STATUS_ROWS.map((row) => {
    const count = stats[row.key];
    return {
      status: row.status,
      label: row.label,
      count,
      percent: Math.round((count / total) * 1000) / 10,
      bgClass: row.bgClass,
    };
  });
}

export type ScoreBucket = {
  score: number;
  count: number;
};

export function scoreHistogram(list: EnrichedAnimeItem[]): ScoreBucket[] {
  const buckets: ScoreBucket[] = Array.from({ length: 10 }, (_, i) => ({
    score: i + 1,
    count: 0,
  }));
  for (const item of list) {
    if (item.score >= 1 && item.score <= 10) {
      buckets[item.score - 1].count++;
    }
  }
  return buckets;
}

export function scoreMode(histogram: ScoreBucket[]): number | null {
  const max = Math.max(...histogram.map((b) => b.count), 0);
  if (max === 0) return null;
  return histogram.find((b) => b.count === max)?.score ?? null;
}

export type GenreStat = {
  name: string;
  count: number;
  percent: number;
};

export function topGenres(
  list: EnrichedAnimeItem[],
  limit = 6
): GenreStat[] {
  const counts = new Map<string, number>();
  let total = 0;
  for (const item of list) {
    const genres = (item.genres ?? []).filter(Boolean);
    if (genres.length > 0) total++;
    for (const genre of genres) {
      counts.set(genre, (counts.get(genre) || 0) + 1);
    }
  }
  const sorted = Array.from(counts.entries()).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  return sorted.slice(0, limit).map(([name, count]) => ({
    name,
    count,
    percent: total ? Math.round((count / total) * 1000) / 10 : 0,
  }));
}

export type TopRatedItem = {
  id: number;
  title: string;
  cover: string;
  score: number;
};

export function topRated(
  list: EnrichedAnimeItem[],
  limit = 6
): TopRatedItem[] {
  return list
    .filter((item) => item.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.title.localeCompare(b.title)
    )
    .slice(0, limit)
    .map((item) => ({
      id: item.id,
      title: item.title,
      cover: item.mainPicture?.large ?? "/coverImagePlaceholder.png",
      score: item.score,
    }));
}

export function completionRate(list: EnrichedAnimeItem[]): number {
  const completed = list.filter((item) => item.status === "completed").length;
  const considered = list.filter((item) => item.status !== "plan_to_watch").length;
  if (!considered) return 0;
  return Math.round((completed / considered) * 1000) / 10;
}
