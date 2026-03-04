# Anitrack Frontend - AI Agent Instructions

## Architecture Overview
This is a Next.js 16 application using the App Router, built with TypeScript and Tailwind CSS v4. The app tracks anime data, fetching from a custom backend API that aggregates data from AniList and MyAnimeList.

- **Routing**: App Router with dynamic routes like `/anime/[id]` and `/usuarios/[user]`
- **State Management**: Zustand stores (e.g., `stores/sidebar.ts`) for client-side state like sidebar toggle
- **Styling**: Tailwind CSS with responsive design patterns (e.g., `lg:w-40 2xl:w-60`)
- **Fonts**: Montserrat via Next.js font optimization

## Data Fetching
Use server actions in `actions/` for all API calls. These are "use server" functions that fetch from `process.env.BACKEND_URL`.

- **Pattern**: Export async functions returning typed data or null, with try/catch error handling
- **Example**: `getAnimesByName.ts` fetches search results from `/api/v1/anime/search`
- **Types**: Defined in `types/` (e.g., `Anime.ts` for full anime objects, `AnimeCard.ts` for list items)

## Component Patterns
- **Client Components**: Mark with "use client" for interactivity (e.g., `AnimeCard.tsx`)
- **Server Components**: Default for static content, can call server actions directly
- **Image Handling**: Use Next.js `Image` component with `fill` prop and `sizes` for responsive images
- **Links**: Use Next.js `Link` for client-side navigation (e.g., `href={`/anime/${anime.id}`}`)
- **Responsive**: Tailwind classes like `w-25 h-35 lg:w-40 lg:h-60 2xl:w-60 2xl:h-80`

## Development Workflow
- **Package Manager**: pnpm (check `pnpm-lock.yaml`)
- **Dev Server**: `pnpm dev` (uses Turbopack)
- **Build**: `pnpm build`
- **Lint**: `pnpm lint` (ESLint with Next.js rules)
- **Environment**: Set `BACKEND_URL` in `.env` for API endpoint

## Key Files
- `app/layout.tsx`: Root layout with header, sidebar, footer
- `app/page.tsx`: Home page with hero, airing table, categories
- `components/anime/horizontal-list/AnimeCard.tsx`: Reusable anime card component
- `utils/getActualSeason.ts`: Helper to determine current anime season
- `next.config.ts`: Image domains for AniList, MyAnimeList, YouTube

## Conventions
- **Imports**: Use `@/*` alias for absolute imports
- **Error Handling**: Console.error with descriptive messages, return null on failure
- **Naming**: PascalCase for components, camelCase for functions/types
- **Images**: Fallback to `/coverImagePlaceholder.jpg` if no cover available
- **Dates**: Use `formatDate.ts` utility for consistent formatting</content>
<parameter name="filePath">/mnt/general/Proyectos/Anitrack/Anitrack-Frontend/.github/copilot-instructions.md