"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCalendar,
  FiExternalLink,
  FiGift,
  FiList,
  FiMapPin,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { EnrichedAnimeItem } from "@/actions/anime-list/getAnimeListEnriched";
import AnimatedNumber from "@/components/general-components/AnimatedNumber";
import EmptyState from "@/components/general-components/EmptyState";
import ProfileAnimeCard from "@/components/user/ProfileAnimeCard";
import { User } from "@/types/user/User";
import {
  completionRate,
  formatBirthday,
  formatDate,
  humanizedDays,
  scoreHistogram,
  scoreMode,
  statusDistribution,
  topGenres,
  topRated,
} from "@/utils/profileStats";

const GENDER_LABELS: Record<string, string> = {
  male: "Masculino",
  female: "Femenino",
  "non-binary": "No binario",
};

export default function ProfileView({
  user,
  animeList,
}: {
  user: User;
  animeList: EnrichedAnimeItem[] | null;
}) {
  const stats = user.statistics;
  const list = animeList ?? [];
  const hasList = list.length > 0;

  const statusDist = stats ? statusDistribution(stats) : [];
  const histogram = scoreHistogram(list);
  const mode = scoreMode(histogram);
  const genres = topGenres(list, 6);
  const best = topRated(list, 6);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 text-text-primary space-y-6 md:space-y-8 animate-fade-in">
      {/* Identity hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-primary/10 via-bg-secondary to-bg-secondary border border-border-default p-5 md:p-8">
        <div className="relative flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center">
          <div className="shrink-0">
            <Image
              src={user.picture ?? "/coverImagePlaceholder.png"}
              alt={`Avatar de ${user.name}`}
              width={128}
              height={128}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-bg-secondary shadow-lg"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {user.name}
              </h1>
              {user.admin && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary-subtle px-3 py-1 text-xs font-semibold text-accent-primary">
                  <FiShield className="w-3.5 h-3.5" aria-hidden="true" />
                  Administrador
                </span>
              )}
            </div>

            <Link
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-body-sm font-medium text-accent-primary hover:text-accent-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded"
            >
              Ver en MyAnimeList
              <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            <div className="flex flex-wrap gap-2 text-caption text-text-secondary">
              {user.location && (
                <MetaChip icon={<FiMapPin className="w-3 h-3" aria-hidden="true" />}>
                  {user.location}
                </MetaChip>
              )}
              {user.gender && (
                <MetaChip icon={<FiUser className="w-3 h-3" aria-hidden="true" />}>
                  {GENDER_LABELS[user.gender.toLowerCase()] ?? user.gender}
                </MetaChip>
              )}
              {formatBirthday(user.birthday) && (
                <MetaChip icon={<FiGift className="w-3 h-3" aria-hidden="true" />}>
                  {formatBirthday(user.birthday)}
                </MetaChip>
              )}
              {formatDate(user.joinedAt) && (
                <MetaChip icon={<FiCalendar className="w-3 h-3" aria-hidden="true" />}>
                  Miembro desde {formatDate(user.joinedAt)}
                </MetaChip>
              )}
            </div>
          </div>
        </div>
      </section>

      {stats === null ? (
        <EmptyState
          icon={<FiAlertCircle className="w-10 h-10" />}
          title="Estadísticas no disponibles"
          description="MyAnimeList no devolvió estadísticas para esta cuenta."
          action={
            <Link
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-body-sm font-medium bg-accent-primary text-text-light hover:bg-accent-primary-hover transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
            >
              Ver perfil en MAL
            </Link>
          }
        />
      ) : (
        <>
          {/* KPI row */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              value={stats.numTotal}
              label="Animes en lista"
              sublabel="Total acumulado"
            />
            <KpiCard
              value={stats.episodesWatched}
              label="Episodios vistos"
              sublabel="Conteo histórico"
            />
            <KpiCard
              value={stats.daysTotal}
              label="Días de anime"
              sublabel={humanizedDays(stats.daysTotal)}
            />
            <KpiCard
              value={stats.meanScore}
              label="Nota media"
              sublabel="Promedio histórico"
            />
          </section>

          {hasList ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main column */}
              <div className="lg:col-span-2 space-y-6">
                {/* List status */}
                <section className="rounded-2xl bg-bg-secondary border border-border-default p-5 md:p-6">
                  <h2 className="text-heading-md font-semibold mb-5">
                    Estado de la lista
                  </h2>
                  <div className="space-y-4">
                    <div
                      className="h-4 w-full rounded-full overflow-hidden bg-bg-tertiary flex"
                      role="img"
                      aria-label="Distribución por estado de la lista"
                    >
                      {statusDist.map(
                        (s) =>
                          s.count > 0 && (
                            <div
                              key={s.status}
                              className={`h-full ${s.bgClass}`}
                              style={{ width: `${s.percent}%` }}
                              aria-hidden="true"
                            />
                          )
                      )}
                    </div>
                    <p className="sr-only">
                      {statusDist
                        .map((s) => `${s.label}: ${s.count} (${s.percent}%)`)
                        .join(", ")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {statusDist.map((s) => (
                        <Link
                          key={s.status}
                          href={`/mi-lista?status=${s.status}`}
                          className="group flex items-center justify-between rounded-xl bg-bg-tertiary/60 hover:bg-bg-tertiary border border-border-subtle px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-3 h-3 rounded-full ${s.bgClass}`}
                              aria-hidden="true"
                            />
                            <span className="text-body-sm font-medium text-text-primary group-hover:text-accent-primary transition">
                              {s.label}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block text-body-sm font-bold text-text-primary">
                              {s.count}
                            </span>
                            <span className="text-caption text-text-tertiary">
                              {s.percent}%
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Score histogram */}
                <section className="rounded-2xl bg-bg-secondary border border-border-default p-5 md:p-6">
                  <h2 className="text-heading-md font-semibold mb-5">
                    Distribución de notas
                  </h2>
                  <div
                    className="flex items-end gap-2"
                    role="img"
                    aria-label="Histograma de puntajes del 1 al 10"
                  >
                    {histogram.map((bucket) => {
                      const max = Math.max(...histogram.map((b) => b.count), 1);
                      const height =
                        bucket.count > 0
                          ? `${(bucket.count / max) * 100}%`
                          : "4px";
                      const isMode = mode === bucket.score;
                      return (
                        <div
                          key={bucket.score}
                          className="flex-1 flex flex-col items-center gap-1.5"
                        >
                          <span className="text-caption text-text-tertiary">
                            {bucket.count}
                          </span>
                          <div className="w-full h-32 bg-bg-tertiary/50 rounded-t-lg overflow-hidden flex items-end">
                            <div
                              className={`w-full ${
                                isMode
                                  ? "bg-accent-primary"
                                  : "bg-text-tertiary/40"
                              } rounded-t-md transition-all duration-normal`}
                              style={{ height }}
                              aria-hidden="true"
                            />
                          </div>
                          <span
                            className={`text-caption font-medium ${
                              isMode ? "text-accent-primary" : "text-text-secondary"
                            }`}
                          >
                            {bucket.score}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Top rated */}
                <section className="rounded-2xl bg-bg-secondary border border-border-default p-5 md:p-6">
                  <h2 className="text-heading-md font-semibold mb-5">
                    Mejor puntuados
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {best.map((anime) => (
                      <ProfileAnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                </section>
              </div>

              {/* Side column */}
              <aside className="space-y-6">
                {/* Genres */}
                <section className="rounded-2xl bg-bg-secondary border border-border-default p-5 md:p-6">
                  <h2 className="text-heading-md font-semibold">Gustos</h2>
                  <p className="text-caption text-text-tertiary mb-5">
                    Porcentaje de tu lista con cada género
                  </p>
                  {genres.length > 0 ? (
                    <div className="space-y-4">
                      {genres.map((g) => (
                        <div key={g.name}>
                          <div className="flex justify-between text-body-sm mb-1">
                            <span className="font-medium text-text-primary">
                              {g.name}
                            </span>
                            <span className="text-text-tertiary">
                              {g.percent}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-bg-tertiary overflow-hidden">
                            <div
                              className="h-full bg-accent-secondary rounded-full"
                              style={{ width: `${g.percent}%` }}
                              aria-hidden="true"
                            />
                          </div>
                          <span className="sr-only">
                            {g.name}: {g.count} animes, {g.percent}%
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-body-sm text-text-secondary">
                      No hay géneros disponibles.
                    </p>
                  )}
                </section>

                {/* Time */}
                <section className="rounded-2xl bg-bg-secondary border border-border-default p-5 md:p-6">
                  <h2 className="text-heading-md font-semibold mb-5">Tiempo</h2>
                  <div className="space-y-5">
                    <div className="rounded-xl bg-bg-tertiary/60 border border-border-subtle p-4 text-center">
                      <span className="block text-display-md font-bold text-text-primary">
                        <AnimatedNumber value={stats.daysTotal} />
                      </span>
                      <span className="text-body-sm text-text-secondary">
                        Días totales de anime
                      </span>
                      <span className="block text-caption text-text-tertiary mt-1">
                        {humanizedDays(stats.daysTotal)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          label: "Viendo",
                          value: stats.daysWatching,
                          color: "bg-accent-primary",
                        },
                        {
                          label: "Completados",
                          value: stats.daysCompleted,
                          color: "bg-status-success",
                        },
                        {
                          label: "En espera",
                          value: stats.daysOnHold,
                          color: "bg-status-warning",
                        },
                        {
                          label: "Abandonados",
                          value: stats.daysDropped,
                          color: "bg-status-error",
                        },
                      ].map((row) => {
                        const max = Math.max(
                          stats.daysWatching,
                          stats.daysCompleted,
                          stats.daysOnHold,
                          stats.daysDropped,
                          1
                        );
                        const pct = (row.value / max) * 100;
                        return (
                          <div key={row.label}>
                            <div className="flex justify-between text-body-sm mb-1">
                              <span className="text-text-secondary">
                                {row.label}
                              </span>
                              <span className="font-medium text-text-primary">
                                {row.value} d
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-bg-tertiary overflow-hidden">
                              <div
                                className={`h-full ${row.color} rounded-full`}
                                style={{ width: `${pct}%` }}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-subtle">
                      <div className="rounded-xl bg-bg-tertiary/60 border border-border-subtle p-3 text-center">
                        <span className="block text-heading-md font-bold text-text-primary">
                          {completionRate(list)}%
                        </span>
                        <span className="text-caption text-text-secondary">
                          Tasa de finalización
                        </span>
                      </div>
                      <div className="rounded-xl bg-bg-tertiary/60 border border-border-subtle p-3 text-center">
                        <span className="block text-heading-md font-bold text-text-primary">
                          {stats.timesRewatched}
                        </span>
                        <span className="text-caption text-text-secondary">
                          Revisitas
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          ) : (
            <EmptyState
              icon={<FiList className="w-10 h-10" />}
              title="Tu lista está vacía"
              description="Agregá animes a tu lista para ver estadísticas detalladas."
              action={
                <Link
                  href="/animes"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-body-sm font-medium bg-accent-primary text-text-light hover:bg-accent-primary-hover transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                >
                  Explorar animes
                </Link>
              }
            />
          )}
        </>
      )}
    </div>
  );
}

function MetaChip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-tertiary/80 border border-border-subtle px-2.5 py-1">
      <span className="text-text-tertiary">{icon}</span>
      {children}
    </span>
  );
}

function KpiCard({
  value,
  label,
  sublabel,
}: {
  value: number;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="rounded-2xl bg-bg-secondary border border-border-default p-4 md:p-5 flex flex-col items-start justify-between gap-1 h-full">
      <span className="text-heading-md font-bold text-text-primary">
        <AnimatedNumber value={value} />
      </span>
      <span className="text-body-sm font-medium text-text-primary">{label}</span>
      <span className="text-caption text-text-tertiary">{sublabel}</span>
    </div>
  );
}
