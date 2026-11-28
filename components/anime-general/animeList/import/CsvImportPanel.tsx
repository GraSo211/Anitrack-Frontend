"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { clsx } from "clsx";
import { RxCross1 } from "react-icons/rx";
import { FiUploadCloud, FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "@/components/general-components/Button";
import EmptyState from "@/components/general-components/EmptyState";
import { Candidate, ImportJobView, PreviewRow, RowStatus, SeasonPreview } from "@/types/import";
import { createImportJob } from "@/actions/import/createImportJob";
import { getImportJob } from "@/actions/import/getImportJob";
import { startImport } from "@/actions/import/startImport";
import { resolveImportRows } from "@/actions/import/resolveImportRows";
import { retryImport } from "@/actions/import/retryImport";
import { cancelImport } from "@/actions/import/cancelImport";
import { searchMalAnime } from "@/actions/import/searchMalAnime";

interface CsvImportPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const POLL_MS = 1500;

const phaseLabels: Record<string, string> = {
  PARSING: "Leyendo el archivo...",
  RESOLVING: "Buscando los títulos...",
  PREVIEW_READY: "Listo para sincronizar",
  SYNCING: "Sincronizando con MAL...",
  DONE: "Importación finalizada",
  CANCELLED: "Importación cancelada",
  FAILED: "La importación falló",
};

const statusLabels: Record<RowStatus, string> = {
  READY: "Listo",
  AMBIGUOUS: "Ambiguo",
  NOT_FOUND: "No encontrado",
  INVALID: "Inválido",
  PENDING: "Pendiente",
  SYNCED: "Sincronizado",
  PARTIAL: "Parcial",
  FAILED: "Fallido",
};

const statusClasses: Record<RowStatus, string> = {
  READY: "bg-status-success-subtle text-status-success",
  AMBIGUOUS: "bg-status-warning-subtle text-status-warning",
  NOT_FOUND: "bg-status-error-subtle text-status-error",
  INVALID: "bg-status-error-subtle text-status-error",
  PENDING: "bg-status-warning-subtle text-status-warning",
  SYNCED: "bg-status-success-subtle text-status-success",
  PARTIAL: "bg-status-warning-subtle text-status-warning",
  FAILED: "bg-status-error-subtle text-status-error",
};

const actionLabels: Record<SeasonPreview["action"], string> = {
  CREATE: "Nueva",
  UPDATE: "Actualiza",
  KEEP: "Ya en tu lista",
  SKIP: "Se omite",
  PENDING: "Pendiente",
};

const actionClasses: Record<SeasonPreview["action"], string> = {
  CREATE: "bg-status-success-subtle text-status-success",
  UPDATE: "bg-accent-primary-subtle text-accent-primary",
  KEEP: "bg-bg-quaternary text-text-secondary",
  SKIP: "bg-bg-quaternary text-text-muted",
  PENDING: "bg-status-warning-subtle text-status-warning",
};

const existingStatusLabels: Record<string, string> = {
  watching: "Viendo",
  completed: "Completado",
  on_hold: "En pausa",
  dropped: "Abandonado",
  plan_to_watch: "Pendiente",
};

function skipReason(season: SeasonPreview): string {
  if (season.action === "SKIP") {
    return "La excluiste de esta sincronización desde el preview.";
  }
  const existing = season.existing;
  if (!existing) {
    return "No se sincronizó.";
  }
  const status = existingStatusLabels[existing.status] ?? existing.status;
  const score = existing.score > 0 ? `nota ${existing.score}` : "sin nota";
  return `Ya estaba en MAL como «${status}» (${score}, ${existing.numEpisodesWatched} eps vistos) y no marcaste «Reemplazar en MAL».`;
}

function formatYear(date: string | null): string | null {
  if (!date) return null;
  const year = date.split("-")[0];
  return year && /\d{4}/.test(year) ? year : null;
}

export default function CsvImportPanel({ isOpen, onClose }: CsvImportPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState<ImportJobView | null>(null);
  const [panelError, setPanelError] = useState<string | null>(null);
  const [overwriteMalIds, setOverwriteMalIds] = useState<Set<number>>(new Set());
  const [deselectedSeasonIds, setDeselectedSeasonIds] = useState<Set<number>>(new Set());
  const [decisions, setDecisions] = useState<Map<number, number>>(new Map());
  const [searchQueries, setSearchQueries] = useState<Map<number, string>>(new Map());
  const [searchResults, setSearchResults] = useState<Map<number, Candidate[]>>(new Map());
  const [isSearching, setIsSearching] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollingRef = useRef<boolean>(false);
  const searchTimeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const isTerminalPhase = (phase: string | undefined) => phase === "DONE" || phase === "CANCELLED" || phase === "FAILED";

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const poll = useCallback(async () => {
    if (!job || pollingRef.current) return;
    pollingRef.current = true;
    const fresh = await getImportJob(job.jobId);
    pollingRef.current = false;
    if (fresh) {
      setJob(fresh);
    }
  }, [job]);

  useEffect(() => {
    if (!isOpen) {
      stopPolling();
      return;
    }
    if (!job || isTerminalPhase(job.phase)) {
      stopPolling();
      return;
    }
    stopPolling();
    intervalRef.current = setInterval(() => {
      void poll();
    }, POLL_MS);
    return () => stopPolling();
  }, [isOpen, job, job?.phase, poll, stopPolling]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const timeouts = searchTimeoutsRef.current;
    return () => {
      stopPolling();
      timeouts.forEach((t) => clearTimeout(t));
      timeouts.clear();
    };
  }, [stopPolling]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPanelError(null);
    const dropped = acceptedFiles[0];
    if (!dropped) return;
    if (dropped.size > MAX_FILE_SIZE) {
      setPanelError("El archivo pesa más de 5 MB. Probá con uno más chico.");
      setFile(null);
      return;
    }
    setFile(dropped);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  const handleUpload = async () => {
    if (!file) return;
    setIsSubmitting(true);
    setPanelError(null);
    const created = await createImportJob(file);
    setIsSubmitting(false);
    if (created) {
      setJob(created);
    } else {
      setPanelError("No se pudo subir el archivo. Reintentá.");
    }
  };

  const handleStart = async () => {
    if (!job) return;
    setIsSubmitting(true);
    setPanelError(null);
    const started = await startImport(job.jobId, Array.from(overwriteMalIds), Array.from(deselectedSeasonIds));
    setIsSubmitting(false);
    if (started) {
      setJob(started);
    } else {
      setPanelError("No se pudo iniciar la sincronización. Reintentá.");
    }
  };

  const handleResolve = async () => {
    if (!job) return;
    const decisionsArray = Array.from(decisions.entries()).map(([rowNumber, malId]) => ({
      rowNumber,
      malId,
    }));
    if (decisionsArray.length === 0) return;
    setIsSubmitting(true);
    setPanelError(null);
    const resolved = await resolveImportRows(job.jobId, decisionsArray);
    setIsSubmitting(false);
    if (resolved) {
      setDecisions(new Map());
      setJob(resolved);
    } else {
      setPanelError("No se pudieron resolver las filas. Reintentá.");
    }
  };

  const handleRetry = async () => {
    if (!job) return;
    setIsSubmitting(true);
    setPanelError(null);
    const retried = await retryImport(job.jobId);
    setIsSubmitting(false);
    if (retried) {
      setJob(retried);
    } else {
      setPanelError("No se pudo reintentar. Probá de nuevo.");
    }
  };

  const handleCancel = async () => {
    if (!job) return;
    setIsSubmitting(true);
    const cancelled = await cancelImport(job.jobId);
    setIsSubmitting(false);
    if (cancelled) {
      setJob(cancelled);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJob(null);
    setPanelError(null);
    setOverwriteMalIds(new Set());
    setDeselectedSeasonIds(new Set());
    setDecisions(new Map());
    setSearchQueries(new Map());
    setSearchResults(new Map());
    setExpandedRows(new Set());
  };

  const handleClose = () => {
    onClose();
    if (isTerminalPhase(job?.phase)) {
      handleReset();
    }
  };

  const debouncedSearch = useCallback((rowNumber: number, query: string) => {
    const existing = searchTimeoutsRef.current.get(rowNumber);
    if (existing) clearTimeout(existing);
    if (!query.trim()) {
      setSearchResults((prev) => {
        const next = new Map(prev);
        next.delete(rowNumber);
        return next;
      });
      return;
    }
    const timeout = setTimeout(async () => {
      setIsSearching((prev) => new Set(prev).add(rowNumber));
      const results = await searchMalAnime(query.trim());
      setIsSearching((prev) => {
        const next = new Set(prev);
        next.delete(rowNumber);
        return next;
      });
      setSearchResults((prev) => {
        const next = new Map(prev);
        next.set(rowNumber, results ?? []);
        return next;
      });
    }, 350);
    searchTimeoutsRef.current.set(rowNumber, timeout);
  }, []);

  const handleSearchChange = (rowNumber: number, value: string) => {
    setSearchQueries((prev) => {
      const next = new Map(prev);
      next.set(rowNumber, value);
      return next;
    });
    debouncedSearch(rowNumber, value);
  };

  const handleCandidateSelect = (rowNumber: number, malId: number) => {
    setDecisions((prev) => {
      const next = new Map(prev);
      next.set(rowNumber, malId);
      return next;
    });
  };

  const handleSeasonToggle = (malId: number) => {
    setDeselectedSeasonIds((prev) => {
      const next = new Set(prev);
      if (next.has(malId)) next.delete(malId);
      else next.add(malId);
      return next;
    });
  };

  const handleOverwriteToggle = (malId: number) => {
    setOverwriteMalIds((prev) => {
      const next = new Set(prev);
      if (next.has(malId)) next.delete(malId);
      else next.add(malId);
      return next;
    });
  };

  const toggleRowExpanded = (rowNumber: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowNumber)) next.delete(rowNumber);
      else next.add(rowNumber);
      return next;
    });
  };

  const derived = useMemo(() => {
    if (!job) {
      return {
        readyRows: [],
        ambiguousRows: [],
        notFoundRows: [],
        problemRows: [],
        selectedCount: 0,
        conflictCount: 0,
        unresolvedCount: 0,
        errorCount: 0,
      };
    }
    const readyRows: PreviewRow[] = [];
    const ambiguousRows: PreviewRow[] = [];
    const notFoundRows: PreviewRow[] = [];
    const problemRows: PreviewRow[] = [];

    let selectedCount = 0;
    let conflictCount = 0;

    (job.rows ?? []).forEach((row) => {
      if (row.status === "AMBIGUOUS") ambiguousRows.push(row);
      else if (row.status === "NOT_FOUND") notFoundRows.push(row);
      else if (row.status === "READY" || row.status === "PARTIAL") readyRows.push(row);

      if (row.seasons.some((s) => s.error)) problemRows.push(row);

      row.seasons.forEach((s) => {
        if (s.existing) conflictCount += 1;
        const isIncluded = s.selected && !deselectedSeasonIds.has(s.malId);
        if (isIncluded && s.action !== "SKIP" && s.action !== "PENDING") {
          selectedCount += 1;
        }
      });
    });

    return {
      readyRows,
      ambiguousRows,
      notFoundRows,
      problemRows,
      selectedCount,
      conflictCount,
      unresolvedCount: job.counts.unresolved,
      errorCount: (job.rows ?? []).filter((r) => r.status === "INVALID" || r.status === "FAILED").length,
    };
  }, [job, deselectedSeasonIds]);

  const unresolvedDecisionCount = useMemo(() => decisions.size, [decisions]);

  const skippedEntries = useMemo(() => {
    if (!job?.rows) return [];
    return job.rows.flatMap((row) =>
      row.seasons
        .filter((season) => season.action === "KEEP" || season.action === "SKIP")
        .map((season) => ({ row, season }))
    );
  }, [job]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-bg-primary/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Importar puntuaciones desde CSV"
        className={clsx(
          "fixed inset-4 md:inset-8 lg:inset-16 z-50",
          "bg-bg-secondary border border-border-default rounded-xl shadow-xl",
          "flex flex-col overflow-hidden animate-fade-in-up"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
          <h2 className="text-heading-md font-semibold text-text-primary">Importar CSV</h2>
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Cerrar importador"
            className={clsx(
              "p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
              "transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
            )}
          >
            <RxCross1 className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6" aria-live="polite">
          {panelError && (
            <div className="mb-4 rounded-lg border border-status-error/30 bg-status-error-subtle px-4 py-3 text-body-sm text-status-error">
              {panelError}
            </div>
          )}

          {!job && (
            <section className="max-w-2xl mx-auto">
              <div className="mb-4 rounded-lg border border-border-subtle bg-bg-tertiary/50 px-4 py-3">
                <p className="text-body-sm text-text-secondary">
                  Primera columna: nombre del anime. Después, una calificación (1 a 10) por temporada, en orden de
                  emisión. Las celdas vacías no se modifican en MAL. Usá <code>-</code> o <code>x</code> para marcar
                  una temporada vista sin nota; si la fila no trae ninguna nota, se marca completado solo el anime
                  que encuentre la búsqueda, sin calificación. El encabezado es opcional.
                </p>
                <pre className="mt-2 overflow-x-auto text-caption text-text-tertiary">
{`nombre;calificacion_1;calificacion_2
Boku no Hero Academia;8;-
Frieren`}
                </pre>
              </div>
              <div
                {...getRootProps()}
                className={clsx(
                  "rounded-2xl border-2 border-dashed p-8 md:p-12 text-center cursor-pointer transition-colors",
                  isDragActive
                    ? "border-accent-primary bg-accent-primary-subtle"
                    : "border-border-default hover:border-border-strong bg-bg-tertiary/50"
                )}
              >
                <input {...getInputProps()} aria-label="Seleccionar archivo CSV" />
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border-default bg-bg-secondary mb-6">
                  <FiUploadCloud className="w-7 h-7 text-text-tertiary" aria-hidden="true" />
                </div>
                <p className="text-body-md font-medium text-text-primary">
                  Arrastrá tu CSV o hacé click para seleccionarlo
                </p>
                <p className="text-body-sm text-text-tertiary mt-1">Solo archivos .csv - máximo 5 MB</p>
                {fileRejections.length > 0 && (
                  <p className="mt-3 text-body-sm text-status-error">
                    Formato no válido. El archivo tiene que ser .csv.
                  </p>
                )}
              </div>

              {file && (
                <div className="mt-6 animate-fade-in-up">
                  <p className="text-body-sm text-text-secondary">
                    Archivo seleccionado: <span className="text-text-primary font-medium">{file.name}</span>
                  </p>
                  <Button
                    className="mt-4"
                    onClick={handleUpload}
                    isLoading={isSubmitting}
                    disabled={!file}
                  >
                    Subir y procesar
                  </Button>
                </div>
              )}
            </section>
          )}

          {job && (job.phase === "PARSING" || job.phase === "RESOLVING") && (
            <div className="max-w-xl mx-auto py-12 text-center">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-border-default border-t-accent-primary animate-spin" />
              <p className="text-heading-sm font-semibold text-text-primary">{phaseLabels[job.phase]}</p>
              <p className="text-body-sm text-text-secondary mt-2">
                {job.progress.total > 0
                  ? `${job.progress.done} de ${job.progress.total} procesados`
                  : "Esto puede tardar unos segundos"}
              </p>
              {job.progress.current && (
                <p className="text-caption text-text-muted mt-1 truncate">{job.progress.current}</p>
              )}
              <Button variant="ghost" className="mt-6" onClick={handleCancel} disabled={isSubmitting}>
                Cancelar
              </Button>
            </div>
          )}

          {job && job.phase === "PREVIEW_READY" && (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                <SummaryPill label="A sincronizar" value={derived.selectedCount} />
                <SummaryPill label="Conflictos" value={derived.conflictCount} />
                <SummaryPill label="Sin resolver" value={derived.unresolvedCount} />
                <SummaryPill label="Errores" value={derived.errorCount} />
              </div>

              {derived.readyRows.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-heading-sm font-semibold text-text-primary mb-3">Listos para sincronizar</h3>
                  <div className="border border-border-default rounded-lg overflow-hidden max-h-[40vh] overflow-y-auto">
                    {derived.readyRows.map((row) => (
                      <PreviewRowCard
                        key={row.rowNumber}
                        row={row}
                        deselectedSeasonIds={deselectedSeasonIds}
                        overwriteMalIds={overwriteMalIds}
                        onSeasonToggle={handleSeasonToggle}
                        onOverwriteToggle={handleOverwriteToggle}
                      />
                    ))}
                  </div>
                </section>
              )}

              {(derived.ambiguousRows.length > 0 || derived.notFoundRows.length > 0) && (
                <section className="mb-6">
                  <h3 className="text-heading-sm font-semibold text-text-primary mb-3">
                    Pendiente de resolución
                  </h3>
                  <p className="text-body-sm text-text-secondary mb-3">
                    Estas filas no se sincronizan hasta que elijas el anime correcto.
                  </p>
                  <div className="border border-border-default rounded-lg overflow-hidden max-h-[40vh] overflow-y-auto">
                    {derived.ambiguousRows.map((row) => (
                      <ResolutionRowCard
                        key={row.rowNumber}
                        row={row}
                        mode="ambiguous"
                        decisions={decisions}
                        expandedRows={expandedRows}
                        searchQueries={searchQueries}
                        searchResults={searchResults}
                        isSearching={isSearching}
                        onToggleExpand={toggleRowExpanded}
                        onSelectCandidate={handleCandidateSelect}
                        onSearchChange={handleSearchChange}
                      />
                    ))}
                    {derived.notFoundRows.map((row) => (
                      <ResolutionRowCard
                        key={row.rowNumber}
                        row={row}
                        mode="notFound"
                        decisions={decisions}
                        expandedRows={expandedRows}
                        searchQueries={searchQueries}
                        searchResults={searchResults}
                        isSearching={isSearching}
                        onToggleExpand={toggleRowExpanded}
                        onSelectCandidate={handleCandidateSelect}
                        onSearchChange={handleSearchChange}
                      />
                    ))}
                  </div>
                  <Button
                    className="mt-3"
                    onClick={handleResolve}
                    isLoading={isSubmitting}
                    disabled={unresolvedDecisionCount === 0}
                  >
                    Resolver y sincronizar ({unresolvedDecisionCount})
                  </Button>
                </section>
              )}

              <div className="flex flex-wrap gap-3 sticky bottom-0 bg-bg-secondary pt-2 pb-1">
                <Button
                  onClick={handleStart}
                  isLoading={isSubmitting}
                  disabled={derived.selectedCount === 0}
                >
                  Sincronizar {derived.selectedCount} entradas
                </Button>
                <Button variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
                  Cancelar
                </Button>
              </div>
            </>
          )}

          {job && job.phase === "SYNCING" && (
            <div className="max-w-xl mx-auto py-12 text-center">
              <div className="mb-4 h-3 w-full rounded-full bg-bg-tertiary overflow-hidden">
                <div
                  className="h-full bg-accent-primary transition-all duration-normal"
                  style={{
                    width: job.progress.total > 0 ? `${(job.progress.done / job.progress.total) * 100}%` : "0%",
                  }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-heading-sm font-semibold text-text-primary">{phaseLabels[job.phase]}</p>
              <p className="text-body-sm text-text-secondary mt-2">
                {job.progress.done} de {job.progress.total}
              </p>
              {job.progress.current && (
                <p className="text-caption text-text-muted mt-1 truncate">{job.progress.current}</p>
              )}
              <Button variant="ghost" className="mt-6" onClick={handleCancel} disabled={isSubmitting}>
                Cancelar
              </Button>
            </div>
          )}

          {job && (job.phase === "DONE" || job.phase === "CANCELLED" || job.phase === "FAILED") && (
            <div className="max-w-3xl mx-auto">
              <h3
                className={clsx(
                  "text-heading-sm font-semibold",
                  job.phase === "FAILED" ? "text-status-error" : "text-text-primary"
                )}
              >
                {phaseLabels[job.phase]}
              </h3>

              {job.phase === "FAILED" && job.error && (
                <p className="mt-2 text-body-sm text-status-error">{job.error}</p>
              )}

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <SummaryPill label="Sincronizados" value={job.counts.synced} />
                <SummaryPill label="Omitidos" value={job.counts.skipped} />
                <SummaryPill label="Fallidos" value={job.counts.failed} />
                <SummaryPill label="Conflictos" value={job.counts.conflicts} />
              </div>

              {skippedEntries.length > 0 && (
                <section className="mt-6">
                  <h4 className="text-body-md font-semibold text-text-primary mb-2">
                    Omitidos ({skippedEntries.length})
                  </h4>
                  <div className="border border-border-default rounded-lg overflow-hidden max-h-[40vh] overflow-y-auto">
                    {skippedEntries.map(({ row, season }) => (
                      <div
                        key={`${row.rowNumber}-${season.malId}`}
                        className="flex items-start gap-3 px-4 py-3 border-b border-border-subtle last:border-b-0 bg-bg-tertiary/50"
                      >
                        <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-bg-quaternary">
                          {season.image ? (
                            <Image src={season.image} alt="" fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="h-full w-full bg-bg-quaternary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-caption text-text-muted">#{season.order}</span>
                            <p className="text-body-sm font-medium text-text-primary">{season.title}</p>
                          </div>
                          <p className="text-caption text-text-muted">
                            Fila {row.rowNumber} · {row.title}
                          </p>
                          <p className="text-caption text-text-secondary mt-1">{skipReason(season)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {job.counts.failed > 0 && (
                <section className="mt-6">
                  <h4 className="text-body-md font-semibold text-text-primary mb-2">Fallidos</h4>
                  <div className="border border-border-default rounded-lg overflow-hidden max-h-[30vh] overflow-y-auto">
                    {derived.problemRows.map((row) => (
                      <div
                        key={row.rowNumber}
                        className="px-4 py-3 border-b border-border-subtle last:border-b-0 bg-bg-tertiary/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-body-sm font-medium text-text-primary">{row.title}</span>
                          <span className={clsx("text-caption px-2 py-0.5 rounded-full", statusClasses[row.status])}>
                            {statusLabels[row.status]}
                          </span>
                        </div>
                        {row.seasons
                          .filter((season) => season.error)
                          .map((season) => (
                            <p key={season.malId} className="text-caption text-status-error mt-1">
                              {season.title}: {season.error}
                            </p>
                          ))}
                      </div>
                    ))}
                  </div>
                  <Button className="mt-3" onClick={handleRetry} isLoading={isSubmitting}>
                    Reintentar fallidos
                  </Button>
                </section>
              )}

              {(derived.ambiguousRows.length > 0 || derived.notFoundRows.length > 0) && (
                <section className="mt-6">
                  <h4 className="text-body-md font-semibold text-text-primary mb-2">Sin resolver</h4>
                  <div className="border border-border-default rounded-lg overflow-hidden max-h-[30vh] overflow-y-auto">
                    {derived.ambiguousRows.map((row) => (
                      <ResolutionRowCard
                        key={row.rowNumber}
                        row={row}
                        mode="ambiguous"
                        decisions={decisions}
                        expandedRows={expandedRows}
                        searchQueries={searchQueries}
                        searchResults={searchResults}
                        isSearching={isSearching}
                        onToggleExpand={toggleRowExpanded}
                        onSelectCandidate={handleCandidateSelect}
                        onSearchChange={handleSearchChange}
                      />
                    ))}
                    {derived.notFoundRows.map((row) => (
                      <ResolutionRowCard
                        key={row.rowNumber}
                        row={row}
                        mode="notFound"
                        decisions={decisions}
                        expandedRows={expandedRows}
                        searchQueries={searchQueries}
                        searchResults={searchResults}
                        isSearching={isSearching}
                        onToggleExpand={toggleRowExpanded}
                        onSelectCandidate={handleCandidateSelect}
                        onSearchChange={handleSearchChange}
                      />
                    ))}
                  </div>
                  <Button
                    className="mt-3"
                    onClick={handleResolve}
                    isLoading={isSubmitting}
                    disabled={unresolvedDecisionCount === 0}
                  >
                    Resolver y sincronizar ({unresolvedDecisionCount})
                  </Button>
                </section>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="secondary" onClick={handleReset}>
                  Importar otro archivo
                </Button>
                <Button variant="ghost" onClick={handleClose}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SummaryPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border-default bg-bg-tertiary px-3 py-1.5">
      <span className="text-caption text-text-secondary">{label}</span>
      <span className="text-body-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

interface PreviewRowCardProps {
  row: PreviewRow;
  deselectedSeasonIds: Set<number>;
  overwriteMalIds: Set<number>;
  onSeasonToggle: (malId: number) => void;
  onOverwriteToggle: (malId: number) => void;
}

function PreviewRowCard({ row, deselectedSeasonIds, overwriteMalIds, onSeasonToggle, onOverwriteToggle }: PreviewRowCardProps) {
  const handleSeasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const malId = Number(e.target.dataset.malId);
    const type = e.target.dataset.toggleType;
    if (!malId || !type) return;
    if (type === "include") onSeasonToggle(malId);
    else if (type === "overwrite") onOverwriteToggle(malId);
  };

  return (
    <div className="px-4 py-3 border-b border-border-subtle last:border-b-0 bg-bg-secondary">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body-sm font-medium text-text-primary truncate">{row.title}</p>
          <p className="text-caption text-text-muted">Fila {row.rowNumber}</p>
        </div>
        <span className={clsx("shrink-0 text-caption px-2 py-0.5 rounded-full", statusClasses[row.status])}>
          {statusLabels[row.status]}
        </span>
      </div>
      {row.message && <p className="text-caption text-text-secondary mt-1">{row.message}</p>}
      <div className="mt-3 space-y-2" onChange={handleSeasonChange}>
        {row.seasons.map((season) => (
          <SeasonRow
            key={season.malId}
            season={season}
            included={!deselectedSeasonIds.has(season.malId) && season.selected}
            overwrite={overwriteMalIds.has(season.malId)}
          />
        ))}
      </div>
    </div>
  );
}

interface SeasonRowProps {
  season: SeasonPreview;
  included: boolean;
  overwrite: boolean;
}

function SeasonRow({ season, included, overwrite }: SeasonRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border-subtle bg-bg-tertiary/50 p-2">
      <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-bg-quaternary">
        {season.image ? (
          <Image src={season.image} alt="" fill className="object-cover" sizes="40px" />
        ) : (
          <div className="h-full w-full bg-bg-quaternary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-caption text-text-muted">#{season.order}</span>
          <p className="text-body-sm font-medium text-text-primary line-clamp-1">{season.title}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={clsx("text-caption px-2 py-0.5 rounded-full", actionClasses[season.action])}>
            {actionLabels[season.action]}
          </span>
          <span className="text-caption text-text-secondary">
            {season.episodes ? `${season.episodes} eps` : "? eps"} ·{" "}
            {season.score > 0 ? season.score : "Sin nota"}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-caption text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              data-mal-id={season.malId}
              data-toggle-type="include"
              checked={included}
              onChange={() => {}}
              className="rounded border-border-default bg-bg-secondary text-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary/50"
              aria-label={`Incluir ${season.title} en la sincronización`}
            />
            Incluir
          </label>
          {season.existing && (
            <label className="inline-flex items-center gap-2 text-caption text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                data-mal-id={season.malId}
                data-toggle-type="overwrite"
                checked={overwrite}
                onChange={() => {}}
                className="rounded border-border-default bg-bg-secondary text-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                aria-label={`Reemplazar ${season.title} en MAL`}
              />
              Reemplazar en MAL
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

interface ResolutionRowCardProps {
  row: PreviewRow;
  mode: "ambiguous" | "notFound";
  decisions: Map<number, number>;
  expandedRows: Set<number>;
  searchQueries: Map<number, string>;
  searchResults: Map<number, Candidate[]>;
  isSearching: Set<number>;
  onToggleExpand: (rowNumber: number) => void;
  onSelectCandidate: (rowNumber: number, malId: number) => void;
  onSearchChange: (rowNumber: number, value: string) => void;
}

function ResolutionRowCard({
  row,
  mode,
  decisions,
  expandedRows,
  searchQueries,
  searchResults,
  isSearching,
  onToggleExpand,
  onSelectCandidate,
  onSearchChange,
}: ResolutionRowCardProps) {
  const selectedMalId = decisions.get(row.rowNumber);
  const expanded = expandedRows.has(row.rowNumber);
  const candidates = mode === "ambiguous" ? row.candidates : searchResults.get(row.rowNumber) ?? [];

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rowNumber = Number(e.target.dataset.rowNumber);
    const malId = Number(e.target.dataset.malId);
    if (!rowNumber || !malId) return;
    onSelectCandidate(rowNumber, malId);
  };

  return (
    <div className="px-4 py-3 border-b border-border-subtle last:border-b-0 bg-bg-secondary">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body-sm font-medium text-text-primary truncate">{row.title}</p>
          <p className="text-caption text-text-muted">Fila {row.rowNumber}</p>
        </div>
        <span className={clsx("shrink-0 text-caption px-2 py-0.5 rounded-full", statusClasses[row.status])}>
          {statusLabels[row.status]}
        </span>
      </div>
      {row.message && <p className="text-caption text-text-secondary mt-1">{row.message}</p>}

      <button
        type="button"
        onClick={() => onToggleExpand(row.rowNumber)}
        className={clsx(
          "mt-2 inline-flex items-center gap-1 text-caption text-accent-primary hover:text-accent-primary-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded"
        )}
        aria-expanded={expanded}
        aria-label={expanded ? "Ocultar opciones" : "Mostrar opciones"}
      >
        {expanded ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
        {mode === "ambiguous" ? "Elegí el anime correcto" : "Buscá manualmente"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 animate-fade-in">
          {mode === "notFound" && (
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
              <input
                type="text"
                value={searchQueries.get(row.rowNumber) ?? ""}
                onChange={(e) => onSearchChange(row.rowNumber, e.target.value)}
                placeholder="Buscá por título..."
                className={clsx(
                  "w-full rounded-lg border border-border-default bg-bg-tertiary pl-9 pr-3 py-2",
                  "text-body-sm text-text-primary placeholder:text-text-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                )}
                aria-label={`Buscar anime para la fila ${row.rowNumber}`}
              />
              {isSearching.has(row.rowNumber) && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-caption text-text-muted">Buscando...</span>
              )}
            </div>
          )}

          {candidates.length === 0 && !isSearching.has(row.rowNumber) && (
            <EmptyState
              title="No hay opciones"
              description={mode === "ambiguous" ? "No se encontraron candidatos para este título." : "Escribí un título para buscar."}
              className="py-6"
            />
          )}

          <div onChange={handleCandidateChange}>
            {candidates.map((candidate) => {
              const isSelected = selectedMalId === candidate.malId;
              const year = formatYear(candidate.startDate);
              return (
                <label
                  key={candidate.malId}
                  className={clsx(
                    "flex items-start gap-3 rounded-lg border p-2 cursor-pointer transition-colors",
                    isSelected
                      ? "border-accent-primary bg-accent-primary-subtle"
                      : "border-border-subtle bg-bg-tertiary/50 hover:bg-bg-tertiary"
                  )}
                >
                  <input
                    type="radio"
                    name={`row-${row.rowNumber}`}
                    data-row-number={row.rowNumber}
                    data-mal-id={candidate.malId}
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-1 shrink-0 accent-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                    aria-label={`Seleccionar ${candidate.title}`}
                  />
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-bg-quaternary">
                    {candidate.image ? (
                      <Image src={candidate.image} alt="" fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="h-full w-full bg-bg-quaternary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm font-medium text-text-primary line-clamp-1">{candidate.title}</p>
                    <p className="text-caption text-text-secondary">
                      {candidate.mediaType}
                      {candidate.episodes ? ` · ${candidate.episodes} eps` : " · ? eps"}
                      {year ? ` · ${year}` : ""}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
