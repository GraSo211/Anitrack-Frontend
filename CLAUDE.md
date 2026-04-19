# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anitrack is a Next.js 16 application using the App Router that tracks anime data. It fetches from a custom backend API that aggregates data from AniList and MyAnimeList.

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router and Turbopack
- **React**: 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **State Management**: Zustand for client-side state
- **Font**: Montserrat (via next/font)
- **Icons**: react-icons
- **Carousel**: swiper
- **Forms**: react-hook-form

## Development Commands

```bash
# Install dependencies (package manager: pnpm)
pnpm install

# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## Architecture

### Routing
App Router with the following key routes:
- `/` - Home with hero section, airing table, and categories
- `/anime/[id]` - Individual anime detail page
- `/animes` - Anime listings
- `/airingAnimes` - Currently airing anime
- `/lista-anime` - User's anime list
- `/login` - Authentication
- `/perfil` - User profile
- `/usuarios` and `/usuarios/[user]` - User pages

### Project Structure
```
app/              # Next.js App Router pages
actions/          # Server actions for data fetching
├── anime/        # Anime-related actions
├── anime-list/   # User list actions
├── animes/       # Category/anime list actions
├── auth/         # Authentication actions
└── user/         # User-related actions

components/       # React components
├── anime/                # Anime-specific components
├── anime-general/        # General anime display
├── animes/               # Anime listing components
├── airingAnime/          # Airing anime table
├── general-components/   # Layout components (Header, Footer, Sidebar)
├── login/                # Login components
└── user/                 # User profile components

stores/           # Zustand stores
├── sidebar.ts    # Sidebar toggle state
└── user.ts       # User authentication state

types/            # TypeScript types
├── anime/        # Anime, AnimeCard, AnimeReleasing types
└── user/         # User, UserJikan types

utils/            # Utility functions
├── buildTrailerUrl.ts
├── formatDate.ts
└── getActualSeason.ts
```

## Data Fetching

All API calls are in `actions/` as Server Actions (marked with `"use server"`). They fetch from `process.env.BACKEND_URL`.

**Pattern:**
- Export async functions returning typed data or `null` on failure
- Use try/catch with `console.error` for logging
- Set `revalidate` for caching (common values: 86400 for 1 day, 604800 for 1 week)

Example:
```typescript
"use server";

export const getAnimeById = async (id: number): Promise<Anime | null> => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/${id}`, {
            next: { revalidate: 86400 },
        });
        if (!response.ok) throw new Error(`Error status: ${response.status}`);
        return await response.json() as Anime;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
};
```

## Component Conventions

- **Client Components**: Mark with `"use client"` for interactivity (buttons, forms, carousels)
- **Server Components**: Default for static content; can call server actions directly
- **Images**: Use Next.js `Image` component with `fill` and `sizes` props. Fallback to `/coverImagePlaceholder.jpg` if unavailable
- **Links**: Use Next.js `Link` component for navigation (e.g., `href={`/anime/${anime.id}`}`)
- **Responsive Design**: Tailwind classes like `w-25 h-35 lg:w-40 lg:h-60 2xl:w-60 2xl:h-80`

## Environment Variables

Required in `.env`:
```
BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

## Configuration Notes

- **Images**: Remote patterns configured in `next.config.ts` for `s4.anilist.co`, `cdn.myanimelist.net`, and `i.ytimg.com`
- **Imports**: Use `@/*` alias for absolute imports
- **Path Mapping**: Configured in `tsconfig.json` as `"@/*": ["./*"]`
