interface Props {
    season?: string;
    seasonYear?: number;
    countryOfOrigin?: string;
    isAdult?: boolean;
    studio?: string;
    source?: string;
    episodes?: number;
    duration?: number;
    startDate?: { day?: number; month?: number; year?: number };
    endDate?: { day?: number; month?: number; year?: number };
    nextAiringEpisode?: { airingAt?: number; episode?: number };
}

const formatDate = (d?: { day?: number; month?: number; year?: number }) => {
    if (!d?.day || !d?.month || !d?.year) return "Desconocido";
    return `${d.day}/${d.month}/${d.year}`;
};

const formatAiringDate = (unix?: number) => {
    if (!unix) return null;
    return new Date(unix * 1000).toLocaleString("es-AR", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

export default function MetadataCard({
    season,
    seasonYear,
    countryOfOrigin,
    isAdult,
    studio,
    source,
    episodes,
    duration,
    startDate,
    endDate,
    nextAiringEpisode,
}: Props) {
    return (
        <div className="bg-bg-secondary rounded-xl p-4 shadow-md border border-border-default space-y-4">
            <div className="flex flex-wrap gap-2 text-xs">
                {season && seasonYear && (
                    <span className="px-2 py-1 rounded bg-accent-primary-subtle text-accent-primary">
                        {season} {seasonYear}
                    </span>
                )}
                {countryOfOrigin && <span className="px-2 py-1 rounded bg-bg-quaternary text-text-secondary">{countryOfOrigin}</span>}
                {isAdult && <span className="px-2 py-1 rounded bg-status-error-subtle text-status-error font-semibold">+18 Adulto</span>}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-text-secondary">
                <div>
                    <span className="font-semibold text-text-primary">Estudio</span>
                    <p>{studio?.toUpperCase() || "Desconocido"}</p>
                </div>

                <div>
                    <span className="font-semibold text-text-primary">Fuente</span>
                    <p>{source || "Desconocida"}</p>
                </div>

                <div>
                    <span className="font-semibold text-text-primary">Episodios</span>
                    <p>{episodes ?? "—"}</p>
                </div>

                <div>
                    <span className="font-semibold text-text-primary">Duración</span>
                    <p>{duration ? `${duration} min` : "—"}</p>
                </div>

                <div>
                    <span className="font-semibold text-text-primary">Inicio</span>
                    <p>{formatDate(startDate)}</p>
                </div>

                {endDate && (
                    <div>
                        <span className="font-semibold text-text-primary">Fin</span>
                        <p>{formatDate(endDate)}</p>
                    </div>
                )}
            </div>

            {nextAiringEpisode?.airingAt && (
                <div className="rounded-lg bg-accent-primary-subtle border border-accent-primary/30 p-3 text-sm">
                    <span className="font-semibold text-accent-primary">Próximo episodio</span>
                    <p className="text-text-primary">
                        <span className="font-semibold">Episodio {nextAiringEpisode.episode} </span>· {formatAiringDate(nextAiringEpisode.airingAt)}
                    </p>
                </div>
            )}
        </div>
    );
}
