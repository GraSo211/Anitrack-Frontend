# AGENTS.md

Quick orientation for agents working in this repo. Skip generic Next.js / TypeScript guidance — this file is only the stuff that's hard to infer from filenames.

## Stack
- **Next.js 16.1.6** App Router + React 19, TypeScript, Tailwind v4
- **State**: Zustand stores in `stores/` (user, sidebar, theme)
- **Data fetching**: server actions in `actions/` (every file starts with `"use server"`)
- **Forms**: react-hook-form; **UI icons**: react-icons
- **Carousels**: swiper
- **Auth**: cookie-based (`access_token`) read via `next/headers` `cookies()`; backend issues the cookie
- **Backend**: separate service at `BACKEND_URL` (Spring/Java). Anime data ultimately comes from AniList + MyAnimeList.

## Commands
| Task | Command |
|---|---|
| Install | `pnpm install` (lockfile present; also `package-lock.json` exists — project switched mid-flight, prefer pnpm) |
| Dev server | `pnpm dev` (Turbopack) |
| Build | `pnpm build` |
| Typecheck | `npx tsc --noEmit` |
| **Lint** | `npx eslint .` — **`npm run lint` is broken in Next 16** (the deprecated `next lint` script errors out with "no such directory: lint") |
| Test all | `pnpm test` |
| Test one file | `npx jest <path-to.test.ts>` |
| Test pattern | `npx jest <regex>` |

Recommended pre-commit order: `npx tsc --noEmit && npx eslint . && npx jest`.

## Layout
```
app/                   App Router routes (/, /airingAnimes, /anime/[id], /animes, /lista-anime, /login, /perfil, /usuarios, /usuarios/[user])
actions/anime/         per-anime reads (by id, by MAL id, by any id)
actions/anime-list/    user list CRUD; `getAnimeList(token, status?)` is the entry point
actions/animes/        listing/search/filter endpoints (`getReleasingAnimes` is the calendar data source)
actions/auth/          login (MAL OAuth)
actions/user/          user reads
components/            feature-grouped; `general-components/` holds shared design-system widgets
stores/                zustand stores
types/                 all shared types; `anime/Anime.ts` exports most anime shapes
utils/                 `buildTrailerUrl`, `formatDate`, `getActualSeason`
__tests__/             mirrors source tree
```

## Patterns an agent will get wrong
- **Path alias is `@/*`** (not `~/`, not `src/`). Already configured in `tsconfig.json` and `jest.config.ts`.
- **Server actions** are imported into both server and client components freely — Next.js handles the RPC. Do **not** wrap them in `fetch()` from the client.
- **Server pages must `await connection()`** if they read `cookies()` (see `app/airingAnimes/page.tsx`). Otherwise builds/runtime warn.
- **Auth check pattern** for pages: `const token = (await cookies()).get("access_token")?.value;` then either `if (!token) redirect("/login")` (strict) or pass `null` to client (lenient). `app/lista-anime/page.tsx` uses strict; `app/airingAnimes/page.tsx` and `app/page.tsx` use lenient.
- **Cookie forwarding in server actions**: the action reads the cookie and puts it in a `Cookie: access_token=<token>` header itself (see `actions/anime-list/getAnimeList.ts`). Do not rely on browser-side cookies for these calls.
- **Anime id mismatch** is the #1 footgun. The user's list (`AnimeItem.id`) uses **MAL ids**. The releasing calendar (`AnimeReleasing.id`) uses **AniList ids**; MAL id is `idMal`. Always match on `idMal === a.id` for "is this in my list" filters. The shared helper `components/airingAnime/filterAnimesByUserList.ts` does this correctly — reuse it.
- **AiringSwitch value mapping**: `components/anime-general/table/AiringSwitch.tsx` calls `onChange("all" | "following")` (not `"mine"`). Parent components must translate `"following" → "mine"`. See `AiringAnimeDay.tsx`, `AnimeWeek.tsx`, `AnimeWeekMobile.tsx`.
- **`AnimeWeekMobile.tsx` is now a client component** (`"use client"`). It used to be a server component; that change is required for the all/mine toggle to work on mobile. If you split it, keep the directive.
- **Reuse `Button`** from `components/general-components/Button.tsx` — variants `primary | secondary | ghost | danger | success`, sizes `sm | md | lg | icon`. Don't hand-roll buttons.

## Styling
- Tailwind v4 (PostCSS plugin `@tailwindcss/postcss`). No `tailwind.config.*` — theme is defined in `app/globals.css` via CSS variables and the `@theme` directive. Tokens: `bg-bg-secondary`, `text-text-primary`, `border-border-default`, `accent-primary`, etc.
- Font: Montserrat, applied globally in `app/layout.tsx`.
- Use `next/image` with `fill` + `sizes` for remote covers. `next.config.ts` whitelists `s4.anilist.co`, `cdn.myanimelist.net`, `i.ytimg.com`. New image hosts require editing that file.
- Fallback cover: `/coverImagePlaceholder.png` (not `.jpg` — the README and some comments are wrong; trust the actual imports).

## Calendar / airing schedule feature
Two surfaces share the same "all airing vs. my watching list" filter:
- `/airingAnimes` — per-day detail view (`AiringAnimeDay`)
- Home page weekly grid — `AnimeWeek` (desktop) + `AnimeWeekMobile` (mobile) inside `AiringAnimeTable`

Both server components fetch `getReleasingAnimes()` + (if `access_token` exists) `getAnimeList(token, "watching")`, then pass both to a client child that owns the toggle. Toggle is **hidden** when there's no token or the watching list is empty — do not show a disabled state. See `components/airingAnime/filterAnimesByUserList.ts` for the shared filter.

## Testing
- Jest + Testing Library + jsdom. `jest.setup.ts` already mocks `next/navigation`, `next/headers`, and sets `BACKEND_URL` / `NEXT_PUBLIC_BACKEND_URL`.
- Mock `useSearchParams` per-test if the component reads the day param (`AiringAnimeDay` does).
- Co-locate tests under `__tests__/` mirroring the source path.
- **Three pre-existing test suites are red on master** and unrelated to recent work: `__tests__/components/general-components/Header/Header.test.tsx`, `Sidebar.test.tsx`, `anime-general/info/AnimeStatus.test.tsx`. Don't try to "fix" them in unrelated PRs — they fail on `screen.getByText("Iniciar Sesion")` (no accent) vs the actual rendered `Iniciar Sesión` (with accent). Confirmed by stashing changes and re-running.

## Conventions
- Spanish UI strings, English code identifiers. Comments and JSDoc are mixed Spanish/English — match surrounding style.
- **No code comments unless the user asks.** The repo has plenty of JSDoc on shared widgets but zero inline comments in feature code.
- `import { ... } from "@/..."` only — no relative `../../`.
- Server actions return `T | null` and `console.error` on failure; never throw to the client.
- Filenames: kebab-case for actions (`getAnimeByMalId.ts`), PascalCase for components (`AiringAnimeDay.tsx`).
- No barrel `index.ts` files; one component per file.

## Other instruction sources
- `.github/copilot-instructions.md` — older, broader overview; mostly consistent with this file but a few claims are stale (e.g. it says `pnpm lint`, which doesn't work; says `coverImagePlaceholder.jpg`, which is `.png`).

## Git
- Branch: `master`.
- Commit messages: short, lowercase, often no scope/prefix (e.g. `aesthetic changes`, `refactor: update import paths for anime and user types`). Don't invent Conventional Commits.
- No pre-commit hooks, no Husky, no lint-staged.
- Push needs SSH; the `origin` remote was switched to `git@github.com:GraSo211/Anitrack-Frontend.git`. HTTPS push prompts fail in this environment.
