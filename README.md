# The Bro Code

**A Gentleman’s Guide to Mateship — 70 Articles of Loyalty, Class and Broship.**

A cross-platform mobile app (iOS + Android, plus web) built with [Expo](https://expo.dev/) and [Expo Router](https://docs.expo.dev/router/introduction/). It presents an introduction and 70 original articles of the Bro Code, each on its own scrollable page, wrapped in a set of features designed to make the Code easy to read, revisit, and live by.

**Live web app:** https://kytemacbeath92-ship-it.github.io/The-brocade/ — open it on your iPhone in Safari and tap Share → “Add to Home Screen” for an app-like icon.

## Features

- **Introduction (page 1)** explaining what the Bro Code is and how it helps a young bro become a worthy man of mateship.
- **70 articles**, each on its own page, grouped into six categories (Loyalty, Class, Broship, The Wingman, Conduct, Milestones).
- **Reading progress** — every article you open is marked read; your progress is tracked on the Home screen and inside guided paths.
- **Bro of the Day** — a featured article that rotates daily.
- **Guided paths** — curated journeys (The Foundations, The Wingman’s Way, Class & Character, Loyalty Under Fire, Showing Up).
- **Search & filters** — search article text and filter by category or read/unread status.
- **Glance** — a quick, shuffleable single article for a moment of the Code.
- **Read aloud (TTS)** — text-to-speech on each article (native via `expo-speech`, web via the Web Speech API).
- **Share cards** — share any article via the native share sheet, with a clipboard fallback on web.
- **Your Pack** — bookmark articles to a personal collection for quick reference.
- **Ask a Bro** — describe a situation and get pointed to the most relevant articles.
- **Settings** — light/dark/system theme, adjustable text size, and speech rate. Progress is saved on-device.

## Tech stack

- Expo SDK 57, React Native 0.86, React 19
- Expo Router (file-based routing — each article is its own route)
- TypeScript (strict)
- `@react-native-async-storage/async-storage` for on-device persistence
- `expo-speech` (TTS), `expo-clipboard` (share fallback), `@expo/vector-icons`

## Getting started

```bash
npm install
npm run web        # run in the browser (react-native-web)
npm start          # start Metro; press i / a, or scan the QR with Expo Go on your iPhone/Android
```

- **On your iPhone:** install **Expo Go** from the App Store, run `npm start`, and scan the QR code. The app runs natively on your device.
- **In the browser:** `npm run web` serves the app at http://localhost:8081.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo dev server (native + web). |
| `npm run web` | Run the app in the browser. |
| `npm run ios` / `npm run android` | Open on a simulator/emulator or device. |
| `npm run typecheck` | TypeScript type-check (`tsc --noEmit`). |
| `npm run lint` | Lint with `expo lint`. |

## Installable iOS app (EAS Build)

A real, installable iOS app requires Apple code signing, so you need a **paid Apple Developer Program** account and a free **Expo** account. Builds run on Expo's hosted macOS builders via [EAS Build](https://docs.expo.dev/build/introduction/) (no Mac required). Build profiles are defined in `eas.json`; the bundle id is `com.thebrocode.app`.

### One-time setup

```bash
npm install -g eas-cli
eas login                 # Expo account
eas init                  # links this repo to an EAS project (writes the projectId)
```

### Option A — Install on your iPhone via internal (ad-hoc) distribution

Best for getting it onto your own device quickly.

```bash
eas device:create                                   # register your iPhone's UDID (follow the link/QR)
eas build --platform ios --profile preview          # signs an ad-hoc build; Apple login handled by EAS
```

When the build finishes, EAS gives you an install URL/QR — open it in Safari on the registered iPhone to install the app directly.

### Option B — TestFlight (App Store Connect)

Best for wider testing / the real App Store pipeline.

```bash
eas build --platform ios --profile production
eas submit --platform ios --latest                  # uploads to App Store Connect → TestFlight
```

### Building from CI

`.github/workflows/eas-ios-build.yml` runs `eas build` on manual dispatch. Add an `EXPO_TOKEN` [access token](https://expo.dev/settings/access-tokens) as a repository secret, and configure iOS credentials in EAS once (interactively via `eas credentials`, or by providing an App Store Connect API key) so CI builds can sign non-interactively.

### Android (Play Store)

```bash
eas build --platform android --profile production
eas submit --platform android --latest
```

## Permanent web hosting (GitHub Pages)

The web build is deployed to GitHub Pages automatically by `.github/workflows/deploy-web.yml` on every push to `main` (and the app branch). It runs `expo export --platform web` with a subpath base URL and publishes `dist/`, giving a stable URL:

`https://kytemacbeath92-ship-it.github.io/The-brocade/`

The base URL is injected only during that build via `EXPO_BASE_URL` (see `app.config.js`); local dev, tunnels, and native builds are unaffected. If the first deploy fails to enable Pages automatically, enable it once under **Settings → Pages → Build and deployment → Source: GitHub Actions**, then re-run the workflow.

## Project structure

```
src/
  app/                    Expo Router routes
    _layout.tsx           Root stack + providers (theme, state)
    (tabs)/               Home, The Code, Paths, Pack, Settings
    article/[id].tsx      A single article page (scroll, TTS, share, bookmark)
    intro.tsx             Introduction (page 1)
    ask.tsx               Ask a Bro
    glance.tsx            Glance
  components/             Themed text/view + shared UI (Button, Card, Chip, …)
  constants/theme.ts      Brand palette, spacing, radius
  data/articles.ts        Intro + 70 articles, categories, guided paths
  hooks/                  Color-scheme / theme resolution
  lib/                    tts.ts (speech), share.ts (share/clipboard)
  state/store.tsx         Persisted app state (progress, pack, settings)
```

## Content note

All article text is original, written in the spirit of a gentleman’s code of mateship. It contains no references to any television show.
