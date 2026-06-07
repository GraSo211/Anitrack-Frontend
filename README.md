<!-- prettier-ignore -->
<div align="center">

# Anitrack

*Tu rastreador de anime — lleva el control de lo que ves, descubre los estrenos de la temporada y organiza tu lista en un solo lugar.*

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-%3E=20-3c873a?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-preferred-f69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)

[Overview](#overview) • [Features](#features) • [Getting started](#getting-started) • [Project layout](#project-layout) • [Pages](#pages) • [Conventions](#conventions) • [Testing](#testing)

</div>

This repository contains the **web frontend** for Anitrack, a personal anime tracker built on top of the [AniList](https://anilist.co) and [MyAnimeList](https://myanimelist.net) catalogs. It pairs with the [Anitrack backend](https://github.com/Graso211/AniTrack), a Spring service that handles authentication, list storage and data aggregation.

> [!NOTE]
> The UI is in Spanish and code identifiers are in English. The frontend talks to a separate backend over HTTP, so you need to have it running (or pointed to a deployed instance) before the app will be fully functional.

## Overview

Anitrack lets you sign in with your MyAnimeList account, browse the catalog, look at what is airing this week, dig into per-anime details (episodes, trailer, relations, status) and manage your personal watching list — all from a modern, responsive interface.

The app is built with the **Next.js App Router** and leans on **React Server Components** plus **server actions** for data fetching. Client interactivity is kept to islands (search, sidebar, lists, form), and global state lives in lightweight [Zustand](https://zustand.docs.pmnd.rs) stores.

## Features

- **MyAnimeList OAuth login** with cookie-based sessions (`access_token`) read server-side via `next/headers`.
- **Weekly airing calendar** with a toggle to filter between *all releasing anime* and *only the ones in your watching list*.
- **Per-anime detail page** with cover, banner, synopsis, episodes, trailer, score, popularity, studio, source and related media.
- **Personal list management** across the standard MAL statuses: `watching`, `completed`, `on_hold`, `dropped`, `plan_to_watch`.
- **Catalog browsing** with full-text search, genre and tag filters.
- **User profiles** with watching/completed/days/episodes statistics and a public user directory.
- **Design system v2.0** — dark/light theme via CSS variables, Tailwind v4 `@theme` mapping, Montserrat typography.
- **Accessibility-first** — skip links, focus traps in the mobile sidebar, ARIA landmarks, reduced-motion support.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack dev) |
| UI runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (PostCSS plugin, no config file — theme lives in `app/globals.css`) |
| State | [Zustand](https://zustand.docs.pmnd.rs) (`stores/user`, `stores/sidebar`, `stores/theme`) |
| Forms | [react-hook-form](https://react-hook-form.com) |
| Icons | [react-icons](https://react-icons.github.io/react-icons) |
| Carousels | [Swiper](https://swiperjs.com) |
| Tests | Jest 30 + Testing Library + jsdom |
| Backend | Separate Spring service ([Graso211/AniTrack](https://github.com/Graso211/AniTrack)) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) **>= 20**
- [pnpm](https://pnpm.io) (recommended — a `pnpm-lock.yaml` is committed)
- A running instance of the [Anitrack backend](https://github.com/Graso211/AniTrack) (default port `8080`)

### Install

```bash
git clone git@github.com:GraSo211/Anitrack-Frontend.git
cd Anitrack-Frontend
pnpm install
```

### Configure

Create a `.env` file at the repository root:

```env
BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

Both variables point to the same backend; `BACKEND_URL` is read by server actions and `NEXT_PUBLIC_BACKEND_URL` by client components that need to talk to it directly (login redirect, profile fetch).

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

## Available scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `npx eslint .` | Lint the codebase (see note below) |
| `npx tsc --noEmit` | Typecheck without emitting |
| `pnpm test` | Run the Jest test suite |
| `pnpm test:watch` | Jest in watch mode |
| `pnpm test:coverage` | Jest with coverage report |

> [!IMPORTANT]
> `pnpm lint` / `npm run lint` is **broken on Next.js 16** because the `next lint` script was removed. Use `npx eslint .` directly. The recommended pre-commit order is:
> ```bash
> npx tsc --noEmit && npx eslint . && npx jest
> ```

## Project layout

```
app/                   App Router routes (pages live here)
  layout.tsx           Root layout: Header, Sidebar, Footer, auth cookie read
  page.tsx             Home: hero, weekly airing table, best of season, categories
  airingAnimes/        Per-day airing detail view
  anime/[id]/          Anime detail page
  animes/              Catalog browser with filters
  lista-anime/         Authenticated user list (per status)
  login/               MyAnimeList OAuth + email form
  perfil/              Authenticated user profile + stats
  usuarios/, /[user]/  Public user directory and profiles
actions/               Server actions ("use server") grouped by domain
  anime/               Single-anime reads (by id, MAL id, or any id)
  anime-list/          List CRUD (add, modify, get, status)
  animes/              Listing, search, filters, categories, releasing schedule
  auth/mal/            MyAnimeList OAuth helpers
  user/                User reads
components/            Feature-grouped components
  general-components/  Shared design-system widgets (Button, Header, Sidebar, ...)
  airingAnime/         Calendar widgets + shared user-list filter
  anime/               Anime detail page sections
  anime-general/       Cross-cutting anime widgets (list, table, info, ...)
  animes/, login/, user/, examples/
stores/                Zustand stores (user, sidebar, theme)
types/                 Shared TypeScript types
utils/                 Pure helpers (buildTrailerUrl, formatDate, getActualSeason)
__tests__/             Mirrors source tree (Jest)
```

## Pages

| Route | Auth | Purpose |
| --- | --- | --- |
| `/` | optional | Home: hero, weekly airing table, best of season, categories |
| `/airingAnimes` | optional | Per-day airing schedule with all/mine filter |
| `/animes` | none | Catalog with search, genre and tag filters |
| `/anime/[id]` | none | Anime detail (cover, banner, episodes, trailer, relations) |
| `/lista-anime` | **required** | The signed-in user's list, filtered by status via `?status=` |
| `/login` | none | MyAnimeList OAuth (primary) + placeholder email form |
| `/perfil` | required (client) | Profile summary and statistics |
| `/usuarios` | none | Public user directory |
| `/usuarios/[user]` | none | Public user profile |

## Conventions

These are the non-obvious ones — read [`AGENTS.md`](./AGENTS.md) for the long version.

- **Path alias is `@/*`** (configured in `tsconfig.json` and `jest.config.ts`). No relative `../../` imports.
- **Server actions** are imported freely from both server and client components — Next.js handles the RPC. Do **not** wrap them in `fetch()` from the client.
- **Cookie forwarding**: server actions that need auth read the cookie themselves and forward it as a `Cookie: access_token=<token>` header (see `actions/anime-list/getAnimeList.ts`). The browser cookie is not used for these calls.
- **Server pages that read `cookies()`** must `await connection()` from `next/server` before the read (see `app/airingAnimes/page.tsx`). Otherwise builds and runtime warn.
- **Auth check pattern**: `const token = (await cookies()).get("access_token")?.value;` then either `if (!token) redirect("/login")` (strict, used by `/lista-anime`) or pass `null` to the client (lenient, used by `/` and `/airingAnimes`).
- **Anime id mismatch** is the #1 footgun. The user's list (`AnimeItem.id`) uses **MAL ids**; the releasing calendar (`AnimeReleasing.id`) uses **AniList ids** with MAL id under `idMal`. Always match `idMal === a.id` when joining the two — or reuse `components/airingAnime/filterAnimesByUserList.ts`.
- **No code comments unless asked.** JSDoc lives on shared widgets; feature code stays comment-free.
- **Styling**: Tailwind v4, no config file. Theme tokens (`bg-bg-secondary`, `text-text-primary`, `border-border-default`, `accent-primary`, ...) are defined as CSS variables in `app/globals.css` and exposed via the `@theme` directive.
- **Images**: use `next/image` with `fill` + `sizes` for remote covers. Allowed hosts are whitelisted in `next.config.ts` (`s4.anilist.co`, `cdn.myanimelist.net`, `i.ytimg.com`). New hosts require editing that file. Fallback cover is `/coverImagePlaceholder.png`.
- **Buttons**: reuse `components/general-components/Button.tsx` (variants `primary | secondary | ghost | danger | success`, sizes `sm | md | lg | icon`). Don't hand-roll buttons.

## Testing

The test setup uses Jest with `next/jest`, Testing Library and jsdom. `jest.setup.ts` already mocks `next/navigation`, `next/headers` and sets the `BACKEND_URL` environment variables, so most tests can run without extra wiring.

```bash
pnpm test                       # Run all tests
npx jest <path-to.test.ts>      # Run a single file
npx jest <regex>                # Run files matching a pattern
pnpm test:coverage              # Coverage report
```

Tests live under `__tests__/` mirroring the source tree.

> [!WARNING]
> Three pre-existing test suites are red on `master` and unrelated to most work — they assert against `Iniciar Sesion` (no accent) while the UI renders `Iniciar Sesión` (with accent). Don't try to fix them in unrelated PRs. See `AGENTS.md` for the list.

## Related projects

- [Anitrack backend](https://github.com/Graso211/AniTrack) — the Spring service this frontend talks to.
- [AniList](https://anilist.co) and [MyAnimeList](https://myanimelist.net) — upstream catalogs.
