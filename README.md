# Signal Bench

Sayantan Ghosh’s personal portfolio: Next.js App Router, TypeScript, and PostgreSQL. The home introduces the person; `/work` contains published personal projects. `/admin` is a simple project editor protected by one environment-configured password.

Hosting has not been selected. This is a local implementation, not a published site. Final copy, project visuals, and resume remain open; no resume download is shown until an approved file exists. JobVault’s initial story is based on repository documentation, not verified production usage.

## Run locally

Node 20.9+ is supported by the installed Next.js; developed with Node 24.19.0. Exact dependencies are locked. Current versions: Next.js 16.4.3, React 19.3.1, TypeScript 6.0.3.

```sh
npm ci
npm run setup:local
```

Setup generates separate random database/admin credentials in ignored `.env.local` and `.env.database` files and never overwrites existing configuration. Open `.env.local` locally to obtain or change `ADMIN_PASSWORD`; credentials are not printed in logs. The session secret must be at least 32 characters. Rotate the password/secret and restart the app when changing them; old sessions become invalid.

For the current workstation, the dedicated database container already exists:

```sh
docker start portfolio-postgres
npm run db:setup
npm run dev
```

For a fresh machine with Docker, create it once instead:

```sh
docker run -d --name portfolio-postgres --restart unless-stopped --env-file .env.database -p 127.0.0.1:5434:5432 -v portfolio_pgdata:/var/lib/postgresql/data postgres:16-alpine
npm run db:setup -- --seed
npm run dev
```

The optional seed adds JobVault as a **draft** only when its ID is absent. It never resets edits or existing publication state. Publish through the admin to show it locally. This workstation’s seed was published while verifying the admin, so the current Work page contains JobVault.

- Portfolio: http://127.0.0.1:3000
- Admin: http://127.0.0.1:3000/admin
- PostgreSQL: localhost:5434, database/user `portfolio`; password stays in local configuration.

Alternatively supply your own `DATABASE_URL` and the two admin secrets; Docker is optional. PostgreSQL connection options, including TLS where required, belong in the provider’s connection string. Never disable certificate verification as a workaround. Set `SITE_URL` to the eventual canonical origin before production.

## Public motion and interactions

The public portfolio uses staged entrances, scroll-triggered reveals, a subtle display lift, interactive signal traces, and a contextual crosshair for fine mouse pointers. Lenis gently eases wheel input while keeping real document scrolling; touch input, keyboard navigation, and browser history remain native. Mouse effects also work in a narrow desktop window. Coarse pointers do not enable the custom cursor or wheel easing.

Use the footer’s **Motion: on/off** button to choose a static experience. The preference is stored locally when possible and works in memory if storage is unavailable. The system’s reduced-motion preference takes precedence. Reduced mode destroys the easing instance, restores the native cursor, reveals all pending content, and disables motion. Effects are not mounted on `/admin` routes. The public page remains readable and navigable without JavaScript.

## Project editing

Add/edit a name, summary, project state, collection, technologies, links, and optional story sections. New entries can be saved as drafts or published explicitly. Published entries show on Work, their stable-ID route, and the sitemap. Drafts return 404 publicly. Use up/down controls for ordering, unpublish to hide, and confirm deletion to permanently remove a record.

Display names are independent of IDs. Saves detect stale revisions to avoid silently overwriting another tab’s edits. Public reads are dynamic, so edits need no redeploy. The database setup is idempotent; future schema changes should be added as reviewed migrations rather than modifying live data by hand.

Images are optional. The admin accepts HTTPS image URLs plus alt text; external images load directly in the visitor’s browser without a server-side image proxy. This avoids arbitrary server URL fetching but means remote image hosts can receive visitors’ IP addresses and images are not automatically optimised. Prefer trusted static assets/sources. File upload infrastructure is deferred.

## Authentication

The password is checked only on the server. Sessions are signed, expire after eight hours, and use HttpOnly/SameSite cookies; production cookies require HTTPS. Password or session-secret rotation invalidates previous sessions. Logout clears the current browser’s session cookie. There is no account registration or password-reset service.

Every protected read and server mutation checks the session independently. Next.js Server Actions check request origins; no data mutations use GET. Input is validated server-side and story text is escaped. Failed saves preserve form values. A PostgreSQL-backed global attempt window allows ten sign-in attempts per fifteen minutes, shared across instances; as a single-owner simplification, a burst can temporarily lock out the owner too. Successful sign-in clears the attempt window.

Keep `.env` files out of Git. `.env.example` documents the required names. Local generated passwords are for development; configure new production values through the eventual host’s secret settings. Admin is excluded from public navigation and indexing, but access checks provide the actual protection.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

For production integration tests, start the built app separately and then run:

```sh
npm run start -- --port 3001
```

```sh
npm run test:integration
```

Integration tests are opt-in, localhost-only, and require the same local PostgreSQL configuration as the app. They create uniquely named temporary records and clean up only their fixtures. They verify authorised CRUD, ordering, stable IDs, optimistic concurrency, draft privacy/404s, sitemap visibility, invalid inputs, login throttling, logout, and rejection of unauthorised and cross-origin actions. Unit tests cover input validation and session tampering/expiry/password rotation. These do not replace visual/keyboard review or a security audit.

At implementation time `npm audit --omit=dev` reported zero advisories. The full audit reported 16 moderate advisories through development lint tooling’s `minimatch` dependency chain. The suggested automatic major-version fixes would replace the framework lint configuration with incompatible versions; no forced downgrade was applied. Recheck/update that tooling before exposing development tools to untrusted repositories.

## Local database backup and restore

The `portfolio_pgdata` volume survives container restarts. A volume is not a backup. Keep dumps separately and review production backup requirements when choosing hosting.

```sh
mkdir -p backups
docker exec portfolio-postgres pg_dump -U portfolio -d portfolio -Fc > backups/portfolio.dump
```

Restore into a separate empty database first to verify a backup:

```sh
docker exec portfolio-postgres createdb -U portfolio portfolio_restore_check
docker exec -i portfolio-postgres pg_restore -U portfolio -d portfolio_restore_check < backups/portfolio.dump
```

The dump contains project content, including drafts. `backups/` is ignored. No automatic backup scheduler or hosted service is configured.

## Project notes

- `PORTFOLIO_PLAN.md`: chosen design, content constraints, admin scope.
- `BUILD_LOG.md`: tasks, decisions, actual verification, next steps.
- `AGENTS.md`: instructions for future work.
- `mockups/` and `sample.html`: preserved design studies; they are not the Next.js app.

Deployment is intentionally deferred. A production host must support Next.js server execution and reach PostgreSQL; a static HTML-only host cannot run this admin.

## Personal content and skills

Identity, experience and education live in `lib/profile.ts`. The complete resume-backed skills list lives in `lib/skills.ts`; `components/skills.tsx` renders the six-circuit workbench. Project content is still edited through the PostgreSQL-backed admin. Changing `scripts/seed.ts` does not overwrite existing admin records.

The local review checked skill selection, keyboard input, motion-off behaviour, 320–1280px reflow, representative axe-core scans and an isolated database backup/restore. See Build Log for exact outcomes and limits; actual browser zoom, physical-device coverage and production checks remain open.
