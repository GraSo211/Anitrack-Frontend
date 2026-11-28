import { createImportJob } from "@/actions/import/createImportJob";
import { cookies } from "next/headers";

const mockedCookies = cookies as unknown as jest.Mock;

describe("createImportJob", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("sube el archivo como multipart con la cookie correcta y retorna el job", async () => {
    mockedCookies.mockResolvedValueOnce({
      get: jest.fn().mockReturnValue({ value: "test-token" }),
    });

    const jobView = {
      jobId: "job-1",
      phase: "PARSING",
      progress: { done: 0, total: 0, current: null },
      rows: [],
      counts: { rows: 0, seasonsToSync: 0, conflicts: 0, unresolved: 0, synced: 0, skipped: 0, failed: 0 },
      error: null,
      createdAt: "2026-01-01T00:00:00Z",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 202,
      ok: true,
      json: jest.fn().mockResolvedValueOnce(jobView),
    });

    const file = new File(["title,score\nNaruto,8"], "scores.csv", { type: "text/csv" });
    const result = await createImportJob(file);

    expect(result).toEqual(jobView);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/import",
      expect.objectContaining({
        method: "POST",
        headers: {
          Cookie: "access_token=test-token",
        },
        body: expect.any(FormData),
      })
    );

    const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
    const sentFile = (callArgs.body as FormData).get("file");
    expect(sentFile).toBeInstanceOf(File);
    expect((sentFile as File).name).toBe("scores.csv");
    expect(callArgs.headers["Content-Type"]).toBeUndefined();
  });

  it("retorna null cuando el backend falla", async () => {
    mockedCookies.mockResolvedValueOnce({
      get: jest.fn().mockReturnValue({ value: "test-token" }),
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 500,
      ok: false,
    });

    const file = new File([""], "empty.csv", { type: "text/csv" });
    const result = await createImportJob(file);

    expect(result).toBeNull();
  });
});
