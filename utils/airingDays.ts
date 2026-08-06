export type DayKey =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export type AiringDay = {
    key: DayKey;
    slug: string;
    label: string;
    short: string;
};

export const AIRING_DAYS: AiringDay[] = [
    { key: "monday", slug: "lunes", label: "Lunes", short: "Lun" },
    { key: "tuesday", slug: "martes", label: "Martes", short: "Mar" },
    { key: "wednesday", slug: "miercoles", label: "Miércoles", short: "Mié" },
    { key: "thursday", slug: "jueves", label: "Jueves", short: "Jue" },
    { key: "friday", slug: "viernes", label: "Viernes", short: "Vie" },
    { key: "saturday", slug: "sabado", label: "Sábado", short: "Sáb" },
    { key: "sunday", slug: "domingo", label: "Domingo", short: "Dom" },
];

const DAY_ORDER: DayKey[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

const JS_DAY_TO_KEY: DayKey[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export const todayKey = (): DayKey => JS_DAY_TO_KEY[new Date().getDay()];

export const airingDayKeyFromTimestamp = (timestamp: number): DayKey =>
    JS_DAY_TO_KEY[new Date(timestamp * 1000).getDay()];

const normalizeSlug = (slug: string) =>
    slug
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

export const slugToKey = (
    slug: string | null | undefined,
    fallback: DayKey = todayKey(),
): DayKey => {
    if (!slug) return fallback;
    const normalized = normalizeSlug(slug);
    return (
        AIRING_DAYS.find((day) => day.slug === normalized)?.key ?? fallback
    );
};

export const keyToDay = (key: DayKey): AiringDay => {
    const day = AIRING_DAYS.find((d) => d.key === key);
    if (!day) throw new Error(`Día inválido: ${key}`);
    return day;
};

export const adjacentKey = (key: DayKey, direction: 1 | -1): DayKey => {
    const index = DAY_ORDER.indexOf(key);
    return DAY_ORDER[(index + direction + 7) % 7];
};

export const getDateNumberForDay = (key: DayKey): number => {
    const todayIndex = DAY_ORDER.indexOf(todayKey());
    const targetIndex = DAY_ORDER.indexOf(key);
    const diff = (targetIndex - todayIndex + 7) % 7;
    const target = new Date();
    target.setDate(target.getDate() + diff);
    return target.getDate();
};
