# Build Log

Lightweight tracking for Sayantan’s Signal Bench portfolio. Created 1 November 2026. Plain Markdown; no plugin, CLI, or external account required.

## Current handoff

- Phase: first local implementation built; content review and release work remain.
- Application: Next.js 16.4.3 / React 19.3.1 / TypeScript 6.0.3, developed on Node 24.19.0. Historical HTML studies are preserved.
- Selected direction: Signal Bench. The richer motion layer, floating navigation, and recruiter-information refinement are implemented; the design specification is in [the portfolio plan](PORTFOLIO_PLAN.md).
- Next work: manual review of skills, personal copy and project story; select approved resume, project visuals and learning entries (T05), finish physical-device/zoom/performance checks (T03/T12), then choose hosting (T13).
- PostgreSQL is selected. Hosting and image hosting remain undecided; local development is authorised.

## Tracking rules

Use `planned`, `in progress`, `done`, `blocked`, or `dropped`. Change a task to `in progress` when starting it. Mark it `done` only when its result and relevant checks are complete. For a blocked task, record the specific dependency; an undecided choice is not automatically a blocker. Keep dropped tasks and their reason.

Update this file for meaningful task progress, decisions, and session handoff. Add the next unused task/decision ID when needed. Keep design specifications in the portfolio plan; link to them rather than copying them here. Never put passwords, session secrets, or private project data in tracking files.

## Milestones

| ID  | Milestone                          | Status      | Tasks   |
| --- | ---------------------------------- | ----------- | ------- |
| M01 | Foundation | done | T01 |
| M02 | Public portfolio                   | in progress | T02–T05, T16–T17 |
| M03 | Project storage and admin | done | T06–T09 |
| M04 | Motion and polish | done | T10–T11, T14–T15, T18 |
| M05 | Validation and release preparation | in progress | T12–T13 |

## Tasks

Statuses below record current implementation progress. Research and mockups predate this tracker; their established decisions are recorded below.

| ID  | Milestone | Task / completion evidence                                                                                                                                                          | Status      |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| T00 | —         | Create Build Log, repository instructions, and storage clarification; verify document links and consistency.                                                                        | done        |
| T01 | M01 | Initialise Git if needed and scaffold the latest stable Next.js with TypeScript; record supported runtime, versions, lockfile, and working development/build commands. | done |
| T02 | M02 | Build the static Signal Bench home with the proposed palette and readable type; inspect the real desktop composition. | done |
| T03 | M02       | Recompose for mobile and keyboard use; verify zoom, focus, and no clipped content.                                                                                                  | in progress |
| T04 | M02 | Build Work and stable-ID project pages using the shared project model; verify rename-safe URLs and missing-project handling. | done |
| T05 | M02       | Add reviewed About, capabilities, contact, and resume content when available; verify personal work claims and links.                                                                | in progress |
| T06 | M03 | Use the user-selected PostgreSQL; configure the isolated local database, verify durable saves, and document setup and backup/restore. | done |
| T07 | M03 | Implement server-side environment-password login, sessions, logout, and per-action access checks; verify unauthorised access, expiry, and password rotation. | done |
| T08 | M03 | Build the plain project list and editor; verify create/edit validation, safe rendering, image URL fields, and failed-save feedback. | done |
| T09 | M03 | Add draft/publish, ordering, and confirmed deletion; verify public refresh, draft privacy, and saves surviving restart. | done |
| T10 | M04 | Add restrained button feedback, one-shot diagram signal, and arrival reveals; verify reduced motion and uninterrupted navigation. | done |
| T11 | M04 | Add metadata, social preview, favicon, and real image/font optimisation; verify unpublished entries stay out of metadata/sitemap. | done |
| T12 | M05       | Run relevant type/lint/build checks and inspect public/admin flows, mobile, contrast, keyboard, throttling, and cross-site request protection. Record results and remaining limits. | in progress |
| T13 | M05       | Prepare deployment once hosting is chosen; verify production persistence, environment configuration, and final public content before any publication.                               | planned     |
| T14 | M04 | Build the user-approved technical motion, eased desktop scrolling, scroll reveals, and contextual crosshair cursor; verify public routes and reduced-motion/touch/admin fallbacks. | done |
| T15 | M04 | Refine the approach display palette and add a smoothly compacting sticky public header; desktop/mobile, anchors, keyboard and motion-off checks passed. | done |
| T16 | M02 | Add resume-backed professional experience and compact education; verified against the supplied resume and inspected at desktop/mobile widths. | done |
| T17 | M02 | Build the six-circuit skills workbench with all 28 resume-backed tools; six-selection assertions, mobile inline feedback and keyboard/motion-off checks passed. | done |
| T18 | M04 | Add individual tool icons/popovers, React Native, clipped white cursor contrast and a lightly trailing dot; unit, browser, accessibility and integration checks passed. | done |

## Decision record

Recorded at tracker creation as a summary of the existing plan and user instructions; these are not reconstructed historical task events.

| ID  | Decision                                                    | Reason / consequence                                                                                                                                          |
| --- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D01 | Use Signal Bench for the current build direction.           | Preserve the selected instrument composition; earlier alternatives remain references.                                                                         |
| D02 | Introduce Sayantan first; projects open through Work.       | The identity must not depend on one named project.                                                                                                            |
| D03 | Keep professional projects out.                             | Only verified personal work and clearly labelled learning work are in scope.                                                                                  |
| D04 | Build now with the latest stable Next.js.                   | The user superseded the earlier deferral and authorised implementation on 1 November 2026.                                                                    |
| D05 | Include a single-owner, environment-password project admin. | Project management only; no account system or general page editor.                                                                                            |
| D06 | Keep project IDs stable and separate from display names.    | Renaming and growing the collection must not require global edits or break links.                                                                             |
| D07 | Use PostgreSQL; leave hosting undecided.                    | The user selected PostgreSQL and authorised implementation in this session. Use an isolated local database; no hosting provider or image service is selected. |
| D08 | Image uploads are deferred; images are optional.            | Initial forms can accept image URLs with alt text; bundled static assets can also be used.                                                                    |
| D09 | Use Build Log for tracking.                                 | A small local document is sufficient; no additional tracking installation is required.                                                                        |

## Open decisions and dependencies

- Proposed palette needs review in the actual layout; it is not final visual approval.
- Final personal copy, capabilities, resume version, and learning-project selection remain open.
- Verify JobVault’s current features and demo status before final case-study claims.
- PostgreSQL is selected; its production host must be resolved before deployment. No provider account is required for local development.

## Session notes

- 1 November 2026: created tracking during the planning stage. The user subsequently selected PostgreSQL and authorised implementation in this same chat. Hosting/publication remain undecided.

## Checks

Record dated implementation checks and their outcome here as they occur. Do not treat a planned check as a passing result.

- 1 November 2026 — Documentation checks passed: local Markdown links resolve, task IDs are unique, tracker naming is consistent, and the plan explicitly preserves undecided hosting/persistence and optional image storage. No application tests were run; this change only adds tracking and clarifies the plan.

- Implementation status reconciliation: the initial coding pass progressed across T02–T12 before their individual rows were updated. Those rows are marked in progress now; this is not a backdated record. Browser and integration verification are ongoing.

## Implementation handoff — 1 November 2026

- The root Next.js app implements the selected Signal Bench with the silver/ink/cyan/orange palette, responsive layouts, personal About/capabilities/contact, separate Work and stable-ID stories, and restrained motion. No named project appears in the home instrument.
- Project admin implements environment-password login, signed eight-hour sessions, logout, persistent login throttling, per-operation authorisation, validated forms, draft/publish, ordering, stale-edit detection, and confirmed deletion. PostgreSQL is shared by public pages and admin.
- Local PostgreSQL runs as `portfolio-postgres` on localhost:5434 with its own `portfolio_pgdata` volume. JobVault’s database was not altered. Its own initial story is published only in this local portfolio preview; no hosted deployment occurred.
- Local credentials are generated in ignored `.env.local` and `.env.database`; values are not stored in this log. README explains access, startup, optional seed, backup/restore, and production configuration.
- Git is initialised; no remote, commit, or deployment was created. The temporary layout-check page was removed. Production preview is running at http://127.0.0.1:3000; run `npm run dev` for further edits after stopping an existing listener.

### Verification completed

- TypeScript check and ESLint: pass.
- Unit tests: five pass (validation, stable IDs, session tampering/expiry/password rotation, private credential generation/non-overwrite). The separate integration suite is opt-in and skipped by the default unit invocation.
- Production build: pass, including static home/metadata and dynamic project/admin routes.
- Production integration suite: pass for actual create/edit/publish/unpublish/reorder/delete actions with temporary fixture cleanup; stale edits, invalid inputs, unsigned/tampered access, draft 404s and sitemap privacy, CSRF rejection, logout, login throttling, and cross-connection persistence.
- PostgreSQL container restarted; the real local JobVault record and publication state survived. Only that project remained after fixture cleanup.
- Browser QA: 1280px desktop and 390px mobile layouts inspected; the responsive display spacing was corrected. Browser login failure/success, editing/rename, draft/public visibility, publishing, logout, direct editor protection, approach selection, visible skip-link focus, and production Back navigation verified. Desktop document had no horizontal overflow. Screenshots are in ignored `previews/`.
- Runtime dependency audit: zero reported advisories. Full audit: 16 moderate advisories in development lint tooling via minimatch. Incompatible automatic major-version fixes were not applied; see README.

### Remaining work and limits

- T03/T12 remain in progress for a broader device/browser matrix, 200% zoom, actual reduced-motion preference emulation, and a full rendered accessibility/performance audit. Reduced-motion CSS is implemented; these broader checks are not claimed as completed.
- T05 remains in progress: copy/capabilities are provisional, no approved resume is linked, no screenshots are invented, and JobVault's running functionality/demo still needs content verification.
- T13 stays planned until hosting and the production PostgreSQL provider are chosen. Production backup/restore has not been exercised, and no automatic backup service is configured.

- Final production recheck: build and localhost integration suite passed after stricter ID/ordering validation. Production browser sign-in and logout also passed. Generated admin/database secret values were checked against client JavaScript bundles and were absent.

- Visual refinement authorised: the user approved snappy technical interactions with smooth scroll reveals, gentle desktop wheel easing, and a restrained crosshair with contextual labels. This supersedes the earlier no-custom-cursor recommendation. T14 is now in progress; the earlier T10 only covered minimal motion, not a finished visual experience.

## Visual motion pass — 1 November 2026

The user found the initial site too static, then approved snappy technical interactions, smooth section reveals, gently eased desktop scrolling, and a restrained contextual crosshair. This explicitly supersedes the earlier cursor restriction. T14 covers this pass; the earlier T10 was only the minimal initial motion.

- Added Lenis 1.3.27 for fine-pointer wheel easing. Touch remains native; the media decision uses pointer/hover capability, not window width. Lenis instances, listeners, reveal observers, animation frames, and entry animations are cleaned up on route/preference changes.
- Public pages now have coordinated header/name/display entrances, a short perspective-and-mask screen reveal, one-time section reveals, a subtle display lift, project-row hover treatment, SVG engineering icons, replayable signal packets, and changing layer descriptions.
- The cursor has contextual labels and display-aware colours, updates its context while scrolling, and restores the native cursor for keyboard navigation, text fields, window exit, admin routes, and reduced motion.
- Added a footer Motion control. Its setting persists when storage is available, has an in-memory fallback, and cannot override system reduced motion. Static rendering is readable before hydration and without JavaScript; focused reveal content is immediately visible.
- Browser checks: native 1280px iframe preview showed active easing/cursor, running entrance animations that settled to zero, signal selection, progressive scroll reveals, smooth About navigation, and no horizontal overflow. Motion-off showed zero running animations, no easing/cursor, no hidden reveal nodes, and persisted after reload. Admin remained entirely native; returning to public pages re-enabled the visual layer. Client navigation to Work triggered its arrival sequence.
- A 390px layout was checked for overflow. Final pointer capability behaviour intentionally allows mouse effects in narrow desktop windows; a physical coarse-pointer/touch-device matrix remains open. Actual OS preference emulation is also still open; its priority is covered by unit tests.
- Final direct-page check verified the contextual INSPECT cursor, active Lenis, layer selection, and keyboard Tab/Enter with a visible focus outline and native cursor restoration. Proof screenshot: ignored `previews/motion.png`.
- Typecheck, ESLint, production build, seven unit tests, and the opt-in PostgreSQL/HTTP integration suite passed. Runtime dependency audit still reports zero advisories. The pre-existing development-tool audit findings remain documented in README.
- Temporary visual QA HTML was removed. The built portfolio is running at http://127.0.0.1:3000. No hosting, database content changes, or publication were part of this visual pass; integration fixtures were cleaned up.

The visual layer is ready for user review. Final copy, resume, project visuals, broader device/accessibility/performance review, and hosting remain open as recorded above.

## Recruiter information and navigation pass — 1 November 2026

- Before any edits, committed and pushed the existing application to `origin/master`: `60d9193`. Local credentials were checked against staged content and excluded.
- Current scope: a richer display colour, a compact floating sticky header, professional experience, and subordinate education. The user explicitly deferred the skills redesign; its existing content and styling stay unchanged.
- Source: supplied resume. Employment history is now requested; the earlier exclusion of professional project case studies remains in force. Avoid publishing its phone number, unsupported current-status claims, project names, or production metrics.
- Plan: reuse the public shell and motion layer, adjust anchor offsets for the header, add an editorial experience ledger and a small education strip, then run code checks and inspect scroll/navigation at desktop and mobile widths.

### Completion and handoff — 2 November 2026

- T15/T16 complete. The display uses smoked indigo, a restrained lavender glow and the existing mint signal. Navigation stays sticky and contracts into a light floating surface without changing document layout or hiding links. The functional sticky state works independently of the motion preference.
- Added Experience navigation, a professional role ledger with general responsibilities, subordinate education, location and LinkedIn. Facts came from the supplied resume; no professional project names, production metrics, phone number or downloadable private resume were added. Personal background stays in `lib/profile.ts`.
- Native section anchors support repeated clicks, keyboard activation, and cross-page navigation from Work. Lenis now uses the shared CSS scroll padding rather than adding a second offset. The header entrance targets its inner surface so its sticky positioning remains independent.
- Browser checks passed: desktop 1280px and mobile 390px showed no document overflow and all navigation links fit. Floating desktop surface settled at 980px wide, 12px from the top; mobile at 8px. Experience anchors settled around 110px, clear of navigation. Direct-page motion-off navigation remained sticky with 0s transition; repeating the same anchor after returning to the top worked. Tab showed a 3px focus outline on Experience and Enter opened its section. Work-to-Experience navigation passed.
- Education was inspected on mobile; the real desktop experience and floating header are captured in ignored `previews/recruiter-update.png`. Temporary layout-check HTML was removed. Per-site motion was restored to on.
- Typecheck, ESLint, seven unit tests, final production build, and the PostgreSQL/HTTP integration suite passed. The integration fixture cleanup preserved existing project data. An explicit comparison confirmed the capabilities markup and CSS are unchanged from the baseline commit.
- No dependency, database schema, hosted service or deployment change. Production preview remains at http://127.0.0.1:3000. Broader physical-device/OS reduced-motion/accessibility checks and final content approval remain open. T17 is planned only, at the user’s request.
- Git: baseline snapshot was pushed to `origin/master` before editing. This refinement is a separate commit on the same branch.

## Skills, content and local release review — 2 November 2026

- Scope: complete the creative skills workbench, refine personal copy and the existing project presentation, inspect source evidence, and complete available local quality checks. Hosting/publication and an approved public resume remain dependent on user choices; do not invent screenshots, demo availability, learning projects or claims.
- Reach: home/capabilities component, profile data, shared navigation and motion selectors, CSS, project source/content only if verified, relevant checks and handoff. Preserve the existing admin/database state.
- T03/T05/T12 continue in progress. T17 is now authorised and in progress.

### Completed for manual review — 2 November 2026

- T17 done: six selectable skill circuits, a responsive SVG circuit display and purpose-focused explanations. All 28 tools from the supplied resume remain visible; no invented proficiency scores or extra technologies. Mobile displays the selected explanation inline. Small-screen navigation keeps Work, Skills, Experience and Contact accessible, including the 320px layout.
- About copy now connects professional experience and personal work. JobVault’s three original seed story paragraphs were refined using its local README, jobs/reminders/resumes services and the document-generation decision. A guarded one-time update changed only those untouched fields, preserved all other data/publication/IDs, and backed up the original row in ignored `backups/job-vault-before-content-review.json`. The seed remains non-overwriting. New story-section anchors are generated only for populated sections.
- Source review is not a running-app feature test. No invented screenshot, adoption claim, live demo, new project, professional case study or unreviewed downloadable resume was introduced. T05 stays in progress for user review and asset selection.
- Browser assertions passed for all six skill selections: exactly one selected area, matching explanation, and 28 tools retained. At 390px, selecting the last row displayed its explanation beside the selected tools. At 320/640/768/1280px, the document had no horizontal overflow and header navigation fitted. Desktop screenshot: ignored `previews/skills-workbench.png`.
- Keyboard Tab reached Services with a 3px focus outline and Space selected it. With per-site motion off, selection worked, hidden reveal count was zero, Lenis was absent, header transition was 0s, and the selected route had no CSS animation. Motion was restored to on. Physical coarse-pointer devices and actual OS reduced-motion emulation remain untested.
- Rendered axe-core checks (WCAG 2 A/AA, 2.1 AA and best practices) on Home, Work, JobVault and Login found the earlier orange/grey text contrast failure. Darkened the shared action token to #AD3E22. Recheck: zero reported violations on all four routes (37/34/34/37 passing rules). Gradient contrast remains flagged for manual review; conservative primary token checks passed: Action/Canvas 4.95:1, white/Action 6.02:1, muted/casing’s darker endpoint 5.38:1, display secondary/brightest skills gradient 6.35:1. This is not a claim of complete WCAG conformance. Full reports are in ignored `previews/accessibility-review.json`.
- Reflow was checked at 640px; the in-app browser did not apply keyboard zoom shortcuts, so actual 200% browser zoom is still open. Local gzip size of scripts referenced by the rendered page: Home 188.6 KiB; story 190.6 KiB. These are payload measurements, not Lighthouse or real-device performance scores. A broader performance audit remains open.
- Local PostgreSQL backup/restore verified: a custom-format dump restored into a new isolated database and the complete project-record digest matched the source; only that temporary database was dropped. Dump retained privately in ignored `backups/portfolio-review-20261102-JFTP6I.dump`. Production backup configuration still depends on hosting.
- Typecheck, lint, seven unit tests, production build and PostgreSQL/HTTP admin integration passed. No runtime dependency, schema or hosting changes. Temporary accessibility HTML/axe files are removed before handoff.

Manual review order: skills on desktop/mobile; personal facts and copy; JobVault story wording. Remaining choices: approved public resume, real project screenshots/demo, older learning entries, application/PostgreSQL hosting. T03/T05/T12 stay in progress for the explicit limits above; T13 remains planned.

## Skill details and cursor refinement — 2 November 2026

- User references: yashahire.info skill chips/popovers and aahanabobade.com cursor feel. Preserve the workbench and add verified individual tool context; do not copy another candidate’s expertise claims.
- Reach: skills data and markup, local icon assets, popover positioning/dismissal, cursor rendering/CSS/event cleanup, keyboard/touch/reduced-motion fallbacks, and focused geometry/browser checks. React Native is supported by JobVault’s source and is explicitly requested. No database, admin, hosting or dependency upgrade is needed.

### T18 completion — 2 November 2026

- Inspected Yash Ahire’s skills chip/detail bubble and Aahana Bobade’s layered cursor visually. Applied the interaction ideas to Signal Bench; did not reuse their personal copy or infer their timings.
- All 29 tools now have a local icon, a glow on hover/focus, and a detail popover with practical context. React Native was added based on the user’s instruction and JobVault’s React Native/Expo source. Descriptions distinguish professional practice, personal-project use, and toolkit context; no unsupported Expert labels, tenure or scores were invented. Update individual descriptions in `lib/skill-details.ts`.
- Refactored group selection and tool buttons into siblings so buttons are never nested. Opening a tool does not change the selected circuit or shift the page. Popovers support hover, focus and click/tap activation, remain hoverable across the gap, follow their anchor during scrolling, clamp/flip to the viewport, and close on Escape or outside click. Event handlers, close timers and positioning frames are cleaned up.
- Brand glyphs are copied from Simple Icons 16.36.0 (CC0; source/licence in `public/icons`). Generic API/network/cloud/pipeline/terminal symbols are locally drawn. No CDN requests or npm dependency were added; React Native shares the React glyph.
- Cursor: the crosshair frame keeps the actual pointer position. Only its centre dot follows with a 55ms exponential time constant. The RAF stops at rest and is cancelled on hide, route/motion changes and unmount. A duplicate white mark is clipped to actual primary-button rectangles; only overlapping segments change colour, including when the pointer is just outside a button. The tooltip’s dark surface gets the existing mint cursor treatment.
- Browser proof: at a primary button’s left edge, the clip began 44px into the 80px cursor mark and the screenshot showed orange outside/white inside. A nonzero dot offset after movement settled to exactly 0px/0px. Proof: ignored `previews/cursor-button-contrast.png`.
- Popover checks passed: React detail/icon/glow at desktop; React Native’s personal-project description at 390px; React Testing Library’s long label at 320px (popover x=16…289 within a 305px client viewport; no document overflow). Hovering/clicking inside the tooltip kept it open, outside click and Escape dismissed it, and keyboard Tab from React Native opened Flutter’s detail. Proof: ignored `previews/skill-details.png`.
- With per-site reduced motion: 29 skill buttons remained usable, the tooltip had no animation and the custom cursor was hidden. Motion and normal viewport sizing were restored. Physical touch hardware and OS reduced-motion emulation remain outside the tested matrix.
- Rendered axe-core scan with a skill detail open: zero violations, 40 passing rules; existing gradient contrast remains a manual-review item. Temporary audit HTML/JS were removed before final lint and handoff.
- Production build, TypeScript, lint, 11 unit tests and the PostgreSQL/HTTP integration suite passed. Added focused checks for frame-rate-independent dot easing, button-edge clipping coordinates, viewport placement and icon/context coverage. No admin, database, hosting or deployment changes.
