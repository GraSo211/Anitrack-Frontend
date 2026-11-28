import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CsvImportPanel from "@/components/anime-general/animeList/import/CsvImportPanel";
import { ImportJobView } from "@/types/import";

jest.mock("@/actions/import/createImportJob", () => ({
  createImportJob: jest.fn(),
}));
jest.mock("@/actions/import/getImportJob", () => ({
  getImportJob: jest.fn(),
}));
jest.mock("@/actions/import/startImport", () => ({
  startImport: jest.fn(),
}));
jest.mock("@/actions/import/resolveImportRows", () => ({
  resolveImportRows: jest.fn(),
}));
jest.mock("@/actions/import/retryImport", () => ({
  retryImport: jest.fn(),
}));
jest.mock("@/actions/import/cancelImport", () => ({
  cancelImport: jest.fn(),
}));
jest.mock("@/actions/import/searchMalAnime", () => ({
  searchMalAnime: jest.fn(),
}));

import { createImportJob } from "@/actions/import/createImportJob";
import { startImport } from "@/actions/import/startImport";

const mockedCreateImportJob = createImportJob as jest.Mock;
const mockedStartImport = startImport as jest.Mock;

describe("CsvImportPanel preview step", () => {
  const previewJob: ImportJobView = {
    jobId: "preview-job",
    phase: "PREVIEW_READY",
    progress: { done: 3, total: 3, current: null },
    rows: [
      {
        rowNumber: 1,
        title: "Attack on Titan",
        status: "READY",
        message: null,
        candidates: [],
        seasons: [
          {
            malId: 16498,
            title: "Attack on Titan",
            order: 1,
            episodes: 25,
            image: null,
            score: 9,
            selected: true,
            existing: { status: "completed", score: 8, numEpisodesWatched: 25 },
            action: "UPDATE",
            error: null,
          },
        ],
      },
      {
        rowNumber: 2,
        title: "Naruto",
        status: "AMBIGUOUS",
        message: null,
        candidates: [
          {
            malId: 20,
            title: "Naruto",
            mediaType: "TV",
            episodes: 220,
            startDate: "2002-10-03",
            image: null,
          },
          {
            malId: 1735,
            title: "Naruto: Shippuuden",
            mediaType: "TV",
            episodes: 500,
            startDate: "2007-02-15",
            image: null,
          },
        ],
        seasons: [],
      },
    ],
    counts: { rows: 2, seasonsToSync: 1, conflicts: 1, unresolved: 1, synced: 0, skipped: 0, failed: 0 },
    error: null,
    createdAt: "2026-01-01T00:00:00Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedCreateImportJob.mockResolvedValue(previewJob);
    mockedStartImport.mockResolvedValue({ ...previewJob, phase: "SYNCING" });
  });

  const uploadFile = async () => {
    render(<CsvImportPanel isOpen={true} onClose={jest.fn()} />);
    const input = screen.getByLabelText("Seleccionar archivo CSV");
    const file = new File(["title,score\nAttack on Titan,9\nNaruto,8"], "scores.csv", { type: "text/csv" });
    await userEvent.upload(input, file);
    await userEvent.click(screen.getByRole("button", { name: /Subir y procesar/i }));
    await waitFor(() => expect(screen.getByText("Listos para sincronizar")).toBeInTheDocument());
  };

  it("muestra los contadores resumen", async () => {
    await uploadFile();
    expect(screen.getByText("A sincronizar")).toBeInTheDocument();
    expect(screen.getByText("Conflictos")).toBeInTheDocument();
    expect(screen.getByText("Sin resolver")).toBeInTheDocument();
    expect(screen.getByText("Errores")).toBeInTheDocument();
  });

  it("la fila ambigua no se incluye en la sincronización principal", async () => {
    await uploadFile();
    expect(screen.getByText("Pendiente de resolución")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Sincronizar 2 entradas/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sincronizar 1 entradas/i })).toBeInTheDocument();
  });

  it("muestra el motivo de las filas que no se pudieron cargar", async () => {
    mockedCreateImportJob.mockResolvedValueOnce({
      ...previewJob,
      rows: [
        ...previewJob.rows,
        {
          rowNumber: 3,
          title: "Anime roto",
          status: "INVALID",
          message: "No se pudo cargar: MAL no encontró ese anime (404)",
          candidates: [],
          seasons: [],
        },
      ],
      counts: { ...previewJob.counts, rows: 3 },
    });

    await uploadFile();

    expect(screen.getByText("Con error (1)")).toBeInTheDocument();
    expect(screen.getByText(/MAL no encontró ese anime \(404\)/)).toBeInTheDocument();
  });

  it("el reporte lista los omitidos con imagen y motivo", async () => {
    const doneJob: ImportJobView = {
      ...previewJob,
      phase: "DONE",
      progress: { done: 1, total: 1, current: null },
      rows: [
        {
          ...previewJob.rows[0]!,
          status: "SYNCED",
          seasons: [
            {
              ...previewJob.rows[0]!.seasons[0]!,
              action: "KEEP",
              image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
            },
          ],
        },
      ],
      counts: { rows: 1, seasonsToSync: 0, conflicts: 1, unresolved: 0, synced: 0, skipped: 1, failed: 0 },
    };
    mockedStartImport.mockResolvedValueOnce(doneJob);

    await uploadFile();
    await userEvent.click(screen.getByRole("button", { name: /Sincronizar 1 entradas/i }));

    await waitFor(() => expect(screen.getByText("Importación finalizada")).toBeInTheDocument());
    expect(screen.getByText("Omitidos (1)")).toBeInTheDocument();
    expect(screen.getByText(/Ya estaba en MAL como «Completado»/)).toBeInTheDocument();
    expect(screen.getByText(/nota 8, 25 eps vistos/)).toBeInTheDocument();
  });

  it("el checkbox de conflicto alimenta overwriteMalIds al iniciar la sincronización", async () => {
    await uploadFile();
    const conflictCheckbox = screen.getByRole("checkbox", { name: /Reemplazar.*en MAL/i });
    await userEvent.click(conflictCheckbox);
    await userEvent.click(screen.getByRole("button", { name: /Sincronizar 1 entradas/i }));
    await waitFor(() => expect(mockedStartImport).toHaveBeenCalled());
    expect(mockedStartImport).toHaveBeenCalledWith("preview-job", [16498], []);
  });
});
