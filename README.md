# Mikhail Kazakov — Chess Coaching Website

A multilingual marketing and information website built for chess coach Mikhail Kazakov. The site presents coaching services and information to an international audience, with full localization and a modern, responsive design.

**Live site:** [kazakov-website.vercel.app](https://kazakov-website.vercel.app)

![Site preview](public/preview.png)

## Features

- **Multilingual support** — full internationalization (English and French) with locale-based routing, serving content via per-locale dictionary files.
- **Light / dark theming** — user-selectable theme with system-preference detection.
- **Supabase backend** — data stored and managed through a Supabase (PostgreSQL) backend.
- **Analytics** — visitor behavior and engagement tracked with PostHog.
- **Responsive design** — mobile-first layout styled with Tailwind CSS.

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | Next.js 16 (App Router), React 19   |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS v4                      |
| i18n         | next-intl                           |
| Theming      | next-themes                         |
| Backend / DB | Supabase (PostgreSQL)               |
| Analytics    | PostHog                             |
| Hosting      | Vercel                              |

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/MarkianZab/kazakov_website.git
cd kazakov_website
npm install
```

Create a `.env.local` file in the project root with the required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/            # Next.js App Router pages and layouts
components/     # Reusable UI components
dictionaries/   # Translation files for each supported locale
lib/            # Utilities and shared logic
public/         # Static assets (images, fonts)
middleware.ts   # Locale routing and request handling
```

## Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the development server      |
| `npm run build` | Build the app for production      |
| `npm run start` | Run the production build locally  |
| `npm run lint`  | Run ESLint                        |

## Deployment

The site is deployed on [Vercel](https://vercel.com). Pushes to the `main` branch trigger automatic production deployments. Environment variables are configured in the Vercel project settings.

## License

Released under the MIT License. See [LICENSE](LICENSE) for details.
