---
description: Project architecture and dependency rules for kansai-accent-floe
globs: src/**/*
---

# Project Architecture

This is a Kansai accent dictionary app built with React, TanStack Router, Supabase, and Tailwind CSS.

## Directory Structure

```
src/
├── app/                   Framework shell. Routing and layouts.
│                          Wires the app together but has no business logic.
│   └── routes/            TanStack Router route definitions. Thin files that
│                          import from features/ and declare the route.
│
├── features/              All UI lives here. One folder per domain.
│   ├── shared/            Components/hooks/ui used across multiple features.
│   │                      Nothing in shared/ imports from other features.
│   │   ├── components/    Reusable React components shared across features.
│   │   ├── ui/            Thin re-exports of UI library components (e.g. Button).
│   │   │                  Import third-party UI components here, re-export with
│   │   │                  the same name. All features import from here, never
│   │   │                  directly from the library.
│   │   ├── icons/         Thin re-exports of icon library components.
│   │   │                  Name pattern: <Name>Icon (e.g. SearchIcon).
│   │   └── providers/     App-wide React providers (QueryClient, Auth, etc.)
│   ├── search/            Everything for the dictionary search flow.
│   ├── auth/              Everything for login/logout/session.
│   └── editor/            Everything for creating/editing entries.
│
│       Within each feature (flat layout — no pages/ subdirectory):
│       ├── {feature-name}-page.tsx   Page component, flat in the feature dir.
│       ├── components/    React components scoped to this feature.
│       └── hooks/         (if needed) Feature-specific hooks.
│
├── services/              API communication layer. Knows your backend (Supabase).
│   └── supabase/
│       ├── _generated/    Auto-generated Supabase types (don't edit).
│       ├── client.ts      Supabase client singleton.
│       ├── auth/          Auth service helpers.
│       └── entries/       Entry/accent query functions.
│
├── models/                Shared domain types and constructors.
│                          Used across services and features.
│
├── config/                Environment variables and app configuration.
│
└── assets/                Static assets (CSS, images, SVGs).
```

## Dependency Rules

Stuff on the left can import from stuff on the right:

```
app/routes  →  features  →  services  →  models
                  ↓
               models
```

- `app/` imports from `features/` only.
- `features/` imports from `services/`, `models/`, and `features/shared/`.
- `features/shared/` never imports from other features.
- `services/` imports from `models/` only (plus third-party packages).
- `models/` imports from nothing in the app (only `_generated` types).

## Conventions

- Path alias: `#/` → `./src/` (e.g. `import { supabase } from '#/services/supabase/client'`).
- Route files are thin: import a page component from `features/`, declare the route, done.
- Supabase client is a singleton accessed via `getSupabaseClient()`.
- Auth state is provided via React context (`AuthProvider`).
- Japanese UI text is used for user-facing labels (検索, ログイン, etc.).
