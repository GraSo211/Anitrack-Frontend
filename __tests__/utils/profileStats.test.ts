import {
  completionRate,
  formatBirthday,
  humanizedDays,
  scoreHistogram,
  scoreMode,
  statusDistribution,
  topGenres,
  topRated,
} from "@/utils/profileStats";
import { EnrichedAnimeItem } from "@/actions/anime-list/getAnimeListEnriched";
import { User } from "@/types/user/User";

const item = (overrides: Partial<EnrichedAnimeItem>): EnrichedAnimeItem => ({
  id: 1,
  title: "Anime",
  mainPicture: { medium: "m.jpg", large: "l.jpg" },
  status: "completed",
  score: 0,
  episodesWatched: null,
  isRewatching: false,
  genres: [],
  season: "",
  seasonYear: null,
  animeStatus: "",
  ...overrides,
});

describe("profileStats", () => {
  it("builds a 1-10 histogram ignoring unrated items", () => {
    const histogram = scoreHistogram([
      item({ score: 8 }),
      item({ score: 8 }),
      item({ score: 10 }),
      item({ score: 0 }),
    ]);

    expect(histogram).toHaveLength(10);
    expect(histogram[7].count).toBe(2);
    expect(histogram[9].count).toBe(1);
    expect(scoreMode(histogram)).toBe(8);
  });

  it("returns null mode when nothing is rated", () => {
    expect(scoreMode(scoreHistogram([item({ score: 0 })]))).toBeNull();
  });

  it("ranks genres as share of the list, not of genre occurrences", () => {
    const genres = topGenres([
      item({ genres: ["Action", "Fantasy"] }),
      item({ genres: ["Action"] }),
      item({ genres: [] }),
    ]);

    expect(genres[0]).toEqual({ name: "Action", count: 2, percent: 100 });
    expect(genres[1]).toEqual({ name: "Fantasy", count: 1, percent: 50 });
  });

  it("only ranks rated anime as top rated", () => {
    const best = topRated([
      item({ id: 1, title: "B", score: 7 }),
      item({ id: 2, title: "A", score: 10 }),
      item({ id: 3, title: "C", score: 0 }),
    ]);

    expect(best.map((b) => b.id)).toEqual([2, 1]);
    expect(best[0].cover).toBe("l.jpg");
  });

  it("computes completion rate excluding plan to watch", () => {
    expect(
      completionRate([
        item({ status: "completed" }),
        item({ status: "completed" }),
        item({ status: "dropped" }),
        item({ status: "plan_to_watch" }),
      ])
    ).toBeCloseTo(66.7, 1);
  });

  it("distributes list statuses with percentages", () => {
    const stats = {
      numWatching: 1,
      numCompleted: 2,
      numOnHold: 0,
      numDropped: 1,
      numPlanToWatch: 0,
      numTotal: 4,
    } as NonNullable<User["statistics"]>;

    const dist = statusDistribution(stats);
    expect(dist).toHaveLength(5);
    expect(dist.find((s) => s.status === "completed")).toMatchObject({
      count: 2,
      percent: 50,
    });
  });

  it("humanizes days into months and years", () => {
    expect(humanizedDays(0)).toBe("0 meses");
    expect(humanizedDays(45)).toBe("≈ 1 mes");
    expect(humanizedDays(120)).toBe("≈ 4 meses");
    expect(humanizedDays(730)).toBe("≈ 2 años");
  });

  it("parses MAL birthdays and rejects malformed values", () => {
    expect(formatBirthday("07-15")).toBe("15 de julio");
    expect(formatBirthday("0715")).toBe("15 de julio");
    expect(formatBirthday("1997-07-15")).toBe("15 de julio");
    expect(formatBirthday("nope")).toBeNull();
    expect(formatBirthday("13-40")).toBeNull();
    expect(formatBirthday(null)).toBeNull();
  });
});
