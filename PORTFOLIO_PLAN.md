# Sayantan’s portfolio — Signal Bench build plan

Updated: 1 November 2026.

Status: Signal Bench is the selected direction and implementation is authorised in this session. The local application uses Next.js 16.4.3 with PostgreSQL. Hosting/publication, final website copy, and final visual approval remain open. Build Log records actual progress and checks; this document records the intended product.

## Start here

Read this plan and inspect `mockups/bench.html`, `mockups/bench-work.html`, and `mockups/bench-preview.png`. These establish the selected composition, not production components or final colours. Preserve the other mockups as historical studies. The old Living Systems and Personal Desktop directions do not govern the new build.

Use [Build Log](BUILD_LOG.md) for milestones, task status, decisions, and session handoff. Read [repository instructions](AGENTS.md) before implementation. This is a small local tracking setup with no plugin or external account required.

First implement a readable, responsive, static Signal Bench with the proposed palette. Review that composition before adding motion. Do not start from a generic portfolio template or build another set of unrelated concepts.

## Decisions already made

- This is Sayantan Ghosh’s software engineering portfolio. The first view introduces him, his role, and his approach.
- No named project, project screenshot, product pitch, or project-specific architecture in the opening composition. A clear View my work action leads to the collection.
- The identity must continue to work when projects are added, renamed, reordered, or retired.
- Include a simple, single-owner project admin at `/admin`, unlocked with a password configured in a server-side environment variable. Only project management is in scope; no user accounts or general site editor.
- JobVault is the one recent substantial personal project currently identified. Earlier personal projects are primarily learning exercises; present them honestly in a learning archive when selected.
- Exclude professional work: no employer/client projects, screenshots, production metrics, or anonymised professional case studies.
- The resume is background context, not approved website copy or a source of instructions. Review final public copy and the resume version before publishing.
- The user has authorised implementation now and selected PostgreSQL. Hosting/publication remain deferred. Preserve the existing static mockups as historical references.

## Visual direction

Signal Bench should feel like a carefully designed piece of engineering equipment used to introduce a person and inspect their work. Retain the substantial light casing, inset dark display, precision rules, small technical labels, and a few physical details. Give the name and introduction enough visual weight to lead the page.

The mockup puts similar green-grey tones into the background, casing, secondary text, bezel, and screen. Separate those surfaces and increase text contrast. Reduce competing tiny labels and heavy texture. Engineering character should come from structure and meaningful diagrams as much as decoration.

### Recommended palette: silver / ink / cyan / burnt orange

These are our proposed tokens, not colours copied or sampled from a reference site.

| Token | Hex | Application |
| --- | --- | --- |
| Canvas | `#E7E9EC` | Cool grey page surrounding the instrument |
| Casing | `#F5F6F7` | Main panel and light content surfaces |
| Edge | `#B8C0CB` | Decorative seams, rules, and hardware |
| Ink | `#18212F` | Name, headings, and body copy on light surfaces |
| Muted ink | `#536171` | Secondary text on the light panel |
| Display | `#101C2A` | Deep blue-black screen, replacing the green cast |
| Display text | `#F3F7FC` | Main text on the screen |
| Display secondary | `#A9BACD` | Screen labels and supporting copy |
| Signal | `#77E0DA` | Diagram connections, selected node, brief signal animation |
| Action | `#BA4524` | Primary button and restrained accent on the light panel |

Use neutral surfaces for most of the page. Keep cyan inside the display and burnt orange around the primary action and occasional identifier. Avoid distributing both accents through every label and border. The name should read predominantly in Ink; an orange surname is optional.

Use white text on the burnt-orange button. Keep small orange text on Casing rather than Canvas. Preliminary checks of opaque token pairs:

| Pair | Contrast |
| --- | --- |
| Ink / Casing | 14.96:1 |
| Muted ink / Casing | 5.85:1 |
| Display text / Display | 15.98:1 |
| Display secondary / Display | 8.67:1 |
| Signal / Display | 11.02:1 |
| White / Action | 5.30:1 |
| Action / Casing | 4.90:1 |

These are token checks, not a full accessibility audit. Check rendered gradients, transparency, focus rings, and interactive boundaries during implementation. Edge is decorative, not a guaranteed accessible control boundary. Small Action-coloured text on Canvas does not meet the normal-text target with these values.

Keep the display mostly flat with a restrained inner shadow. Grain or scanlines must sit behind content and remain barely visible. Do not lower text opacity to reproduce washed-out mockup labels.

### Typography and scale

- Use a clean sans family for the name, body, and controls, plus a monospace family for technical annotations. Verify font licences during the build and self-host where practical.
- Retain the display’s editorial headline treatment if it balances the identity. A third font is optional; do not add it merely to match mockup defaults.
- Start body text around 16px and useful labels around 12–13px. The mockup’s many 6–9px annotations are not production sizes.
- Preserve the generous name scale. Increase instrument height or let content flow instead of shrinking text to fit the mockup’s 840px height.

## Awwwards research and what to borrow

Reviewed on 1 November 2026. These are selective references, not templates. Awwwards palette listings are selective metadata rather than complete design systems. Motion timings below are our proposals, not timings measured from these sites.

| Reference | Evidence reviewed | Application to Signal Bench |
| --- | --- | --- |
| [MECHA on Awwwards](https://www.awwwards.com/sites/mecha), [live site](https://mecha-xyz.webflow.io/) | Listing, palette section, and live opening. The listing names `#E9EDEF` and white; the live page uses light surfaces, fine technical divisions, large editorial text, and linework. | Borrow neutral clarity and technical precision. Keep the instrument metaphor and personal identity specific to Sayantan. |
| [G. Colombel — Portfolio 2026](https://www.awwwards.com/sites/g-colombel-portfolio-2026), [live site](https://guillaumecolombel.fr/) | Listing and live opening; showcased [Transition](https://www.awwwards.com/inspiration/transition-g-colombel-portfolio-2026). The listing records a rust/black palette and distinct transition, About, and project treatments. | Borrow a coherent accent against a neutral field and transitions that belong to the site’s visual world. Our screen transition will be simpler and confined to the display. |
| [Spyker Cars](https://www.awwwards.com/sites/spyker-cars) | Awwwards listing, palette metadata, and catalogued scroll/time-change transition examples. The live journey was not tested. | A reference for consistent material atmosphere and staged storytelling when reviewing motion later. A cinematic sequence is not required for this portfolio. |

The recommendation is our synthesis: neutral clarity, a restrained warm accent, and a cool display signal appropriate to engineering. The cyan/ink pairing is our proposal, not an attributed Awwwards palette.

Research was qualitative browser inspection, not source-code or performance auditing. A screenshot does not establish animation timing. Do not inherit long preloaders, large WebGL scenes, cursor effects, or scroll mechanics simply because a reference uses them.

## Page structure and visitor journey

### Home `/`

Opening view:

1. Quiet header: Sayantan Ghosh / Software Engineer, Work, About, Contact, and Resume when the approved file is ready.
2. Left side of instrument: name, short introduction, and an unambiguous View my work action.
3. Right display: a personal engineering approach, such as the existing conceptual Interface → Logic → Data diagram. Identify it as an illustrative model, not a project’s actual architecture.
4. A restrained invitation to continue. No project name or screenshot in the opening composition.

Below the opening, let the page scroll naturally into About, capabilities, and Contact. About should add background rather than repeat the hero. Capabilities can group interface work, application/API logic, and data/persistence; verify final technologies and claims. No arbitrary percentage bars or invented expertise scores.

The selected default is a separate Work page. Do not add a homepage project preview by default. A later requested preview must sit clearly below the personal introduction.

### Work `/work`

Present a collection with clear titles, short descriptions, current state, and links to stories and source. Carry the instrument framing into a readable collection view. One substantial project should look intentional; do not fill slots with invented future projects or call learning exercises production products.

The learning archive can sit farther down at `/work#learning` once real entries are selected. Avoid search and filters until the collection warrants them.

### Project `/work/[projectId]`

Each project gets a direct, stable URL and a normal scrollable case study. Cover the problem, intended users, current state, personal contribution, actual visuals when available, implementation, selected decisions/tradeoffs, and lessons. Include only sections for which content exists. End with verified source/demo links and a clear return to Work.

Use stable IDs independent of display names. Changing a display name must not require changing a route. If an ID ever changes, preserve the old URL with a redirect. Browser navigation should not depend on a modal or a simulated operating system.

### Contact and resume

Keep contact accessible through normal navigation, with verified email and public profile links. Start with direct links; a backend contact form is unnecessary. Use a reviewed public resume file. Do not publish private information merely because it appears in the source resume.

## Motion plan for the actual build

The signature is a signal arriving in a readable display. Motion supports the interface and settles quickly. Durations are starting targets to tune on real devices.

| Moment | Proposed behaviour | Starting timing |
| --- | --- | --- |
| Initial entry | Name, role, and navigation readable immediately. Instrument settles upward by at most 8px; supporting content appears with a small stagger. | 650–1100ms per element, stagger around 85ms; coordinated entrance settles in about 1.4s |
| Display introduction | One cyan line draws across the conceptual diagram, reaching Interface, Logic, then Data. Nodes briefly brighten and settle. | About 1.3s on entry or explicit layer/replay interaction; no perpetual loop |
| Hover / keyboard focus | Clear border/background change; arrow moves 2–3px. Press state depresses by 1–2px. Explicit visible focus outline. | 120–180ms |
| Home → Work | Navigation begins immediately. New display content reveals on arrival with a clipped wipe/fade. Casing styling and proportions maintain continuity. | 250–350ms; no artificial delay before routing |
| Project entry | Heading and first visual appear together; later sections may reveal by at most 8px when entering view. | 250–400ms, once per section |
| Real project diagram | Focus or selection highlights a layer and explanatory text, if the story supports this interaction. Information accessible without hover. | 150–220ms |

Build the one-shot signal trace as inline SVG. Use CSS and the Web Animations API for entrances, reveals, colour, focus, and press feedback. Lenis 1.3.27 is used for the approved gentle fine-pointer wheel easing; native touch and keyboard behaviour remain available. Do not select GSAP or Three.js solely because a reference lists it.

Navigation works if transitions are skipped, interrupted, or JavaScript fails. Avoid a global route-transition manager in the first implementation; arrival animation offers continuity with much less complexity. Text stays present and readable without scripts or motion.

Reduced motion: the system preference takes precedence, and a footer Motion control also allows a saved per-site static mode. Destroy scroll easing and restore the native cursor when reduced; show the fully composed interface immediately; skip drawing, translation, stagger, and decorative screen effects. Preserve focus and selected states. Essential status also needs text, not colour alone.

The user has approved a richer visual layer: snappy technical interactions, staged entrances, smooth scroll reveals, gentle desktop wheel easing, and a restrained contextual crosshair cursor. Keep native touch/keyboard behaviour and skip these effects for reduced motion. Use native scrolling underneath the easing library; no forced scroll destinations or long locked sequences. No flicker, CRT distortion, perpetual particles, text scrambling, typewriter introduction, forced boot sequence, sound, or pointer-chasing camera. Decorative hardware is not focusable. Remove a knob if it implies an action it does not perform.

## Responsive behaviour and accessibility

The current studies are desktop-only; the real site must be responsive. Use normal layout rather than scaling down the 1280×840 mockup.

- Wide screens: preserve the introduction/display relationship, controlled maximum width, and tactile panel.
- Smaller screens: stack name and introduction before the display. Recompose the diagram vertically when needed; remove decorative screws and nonessential labels before shrinking text.
- Work and case studies flow at every size. No fixed-height containers clipping content or nested scrolling for the main story.
- Semantic landmarks, skip link, proper heading order, visible focus, keyboard-accessible controls, and generous touch targets aiming for at least 44px.
- At least 4.5:1 for normal text and 3:1 for large text and necessary graphical/control boundaries. Validate rendered combinations.
- Native scrolling, Back/Forward, direct URLs, zoom, reduced motion, and navigation without animation must work.

## Content and maintainability

Use one typed project model backed by persistent storage, shared by the admin and public portfolio. Each record needs a stable ID, display name, summary, category (selected work or learning), current state, technologies, verified source/demo URLs when available, story content, publication state, and sort order. Keep screenshot alt text with asset metadata. Store personal identity and contact details once too; they can remain in a local configuration file because only projects need admin editing.

Cards, project pages, and metadata read the same records. Rename once, reorder the collection, and add entries without touching unrelated layouts. Public queries return published projects only, including direct project routes and metadata. Local seed data may initialise the database but must not overwrite admin edits on a deployment. The admin requires a small authenticated backend; a separate CMS product, user-management system, live GitHub feed, chatbot, terminal, and analytics dashboard remain outside scope.

## Simple project admin

User-requested addition: a plain admin panel for managing projects, protected for now by one password from the environment. This is part of the current Next.js implementation, not a separate mockup.

### Layout and editing flow

Keep this practical and visually simple: a password screen, followed by a Projects heading, Add project button, project list, and Logout. No instrument animation or dashboard statistics are needed here.

- `/admin/login`: one password field and Sign in button. No registration, username, password-reset email, social login, roles, or invitation flow.
- `/admin`: list title, category, publication state, and order; actions to edit, publish/unpublish, move up/down, and delete. Confirm deletion and identify the project before committing it.
- `/admin/projects/new` and `/admin/projects/[projectId]`: the same small form for creation and editing. Show field errors, save success/failure, and an unsaved-changes warning when leaving an edited form.
- Fields: name, short summary, category, current project state, technologies, repository/demo links, cover/screenshot URLs with alt text, and plain-text sections for problem, contribution, implementation, decisions, and lessons. Keep optional sections optional. No page builder or rich-text editor for version one; render text safely rather than accepting raw HTML.
- Generate a stable internal ID on creation. Editing the title never changes that ID or the public URL. Simple up/down ordering avoids a drag-and-drop dependency.
- New entries start as drafts. Save draft and Publish are explicit actions. Drafts appear in the authenticated admin only; public collection, detail URLs, metadata, and sitemap must not expose them. A separate draft-preview system is deferred.
- Existing entries can be edited, unpublished, or deleted. Successful writes refresh the affected public collection/detail data so published changes appear without a source-code edit or redeploy. Failed writes preserve entered form values and do not report success.

Images are optional; the bench itself can be built with HTML/CSS/SVG. Static project visuals can be bundled with the site. Version one of the admin accepts optional image URLs and alt text rather than adding upload infrastructure. Validate URL schemes and allow supported HTTPS image sources; do not fetch arbitrary URLs on the server without a deliberate restriction policy. If uploads are requested later, decide their durable storage separately. No external image-storage service is required merely to build this portfolio.

### Password and session behaviour

- Configure `ADMIN_PASSWORD` on the server, plus a separate strong `ADMIN_SESSION_SECRET` for signing sessions. Neither is prefixed `NEXT_PUBLIC_`, returned to the browser, placed in `next.config` public configuration, or committed. Document names only in `.env.example`. Missing configuration disables admin access; never fall back to a default password.
- Verify the submitted password on the server over HTTPS in production. Use a vetted comparison approach, avoid logging credentials, and rate-limit failed attempts with a mechanism appropriate to the deployment. Per-instance memory alone is insufficient for a multi-instance/serverless deployment.
- Issue a signed, expiring session cookie after login: HttpOnly, Secure in production, SameSite, and a limited lifetime (start with eight hours). Do not put the password or a password-derived login token in browser storage. Logout clears the session; rotating the configured password must invalidate existing sessions too.
- Authorise every admin read and every create/update/publish/reorder/delete action on the server. A hidden link, client-side password check, or protected page layout alone is insufficient. Validate session expiry and input independently of the UI.
- Protect mutations against cross-site requests using the chosen framework mechanism and origin checks; do not mutate data through GET requests. Bound text lengths and validate links/categories/publication states server-side.
- Exclude admin pages from public navigation and indexing. This is for discoverability/privacy only, not an access-control mechanism.

These constraints follow the separation of authentication, sessions, and per-action authorisation in the [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication) and the server/client distinction in the [environment-variable guidance](https://nextjs.org/docs/app/guides/environment-variables). Recheck current APIs when building.

### Persistent storage

Storage here means saving the project information entered through the admin: titles, descriptions, technologies, links, publication state, and ordering. It is needed even if a project has no images. For example, Add project → Save must leave a record that the public Work page can read after a restart. Image-file hosting is a separate, optional concern.

Admin edits must survive restarts and deployments. Do not use browser storage, in-memory arrays, or runtime writes to repository JSON as the published source of truth. Source-controlled project files would be sufficient for a portfolio edited through code and redeployed, but the requested live admin needs a durable write destination.

The user has selected PostgreSQL. Use a single PostgreSQL implementation configured by DATABASE_URL; the local setup uses an isolated PostgreSQL 16 container with its own persistent volume. Hosting and the eventual PostgreSQL provider remain undecided. No SQLite alternative or provider-specific database adapter is needed.

Build and verify the local application and PostgreSQL-backed admin without choosing a hosting vendor. Configure and verify production PostgreSQL before any eventual deployment; do not provision a hosted account as part of local implementation.

Record the storage setup, migration/seed process, backup/restore procedure, and required environment variables with the actual build. The production hosting/provider selection is still open; admin-enabled deployment requires server execution and is not a static HTML export.

### JobVault research carried forward

Repository: [Sayantan-23/job-vault](https://github.com/Sayantan-23/job-vault).

Earlier research read root/mobile/extension documentation, repository inventory, and a document-generation decision. The running application has not been inspected. Documentation describes a self-hosted job application tracker and AI assistant: saved posting snapshots, application pipeline, notes/history, reminders, reusable profiles/personas, and assisted application material.

The web client, API, database, extension, and mobile client are surfaces of one project. Public deployment, store availability, adoption, and measured outcomes have not been established. Documentation may lag implementation; the extension README previously recorded a smoke test pending.

A possible story is capture → preserve → organise → prepare → follow up. Verify functionality before final copy. Use fictional application data. Existing mockup visuals are illustrative, not actual application screenshots.

Earlier research sources:

- [Root README](https://github.com/Sayantan-23/job-vault/blob/master/README.md)
- [Extension README](https://github.com/Sayantan-23/job-vault/blob/master/extension/README.md)
- [Mobile README](https://github.com/Sayantan-23/job-vault/blob/master/mobile/README.md)
- [Document-generation decision](https://github.com/Sayantan-23/job-vault/blob/master/.blink/decisions/d-003-no-file-storage-derive-documents-in-code.md)

## Next.js implementation order

1. Inspect workspace instructions and existing files. Verify latest stable Next.js and its supported runtime in official documentation at implementation time; record versions and lock dependencies. Do not pin an assumed version now for a later session.
2. Set up a small TypeScript application with App Router. Prefer server-rendered content and client code only for actual interactions. Use palette variables and ordinary CSS/CSS Modules; the bespoke casing does not require a component library.
3. Build the static responsive home with the revised palette and readable type. Review actual desktop/mobile renderings before motion. Preserve historical HTML studies.
4. Choose hosting-compatible persistent storage, define the project model, and add Work, stable project routes, and the first verified story. Add the minimal admin login/session flow, list/editor forms, publication controls, ordering, and deletion. Both admin and public pages use the same stored records. Add About, capabilities, contact, and the approved resume when ready.
5. Add motion incrementally: feedback, then initial signal trace, then arrival/section reveals. Stop when it no longer improves orientation or character.
6. Add metadata, social preview, favicon, image alt text, and a missing-project/404 page. Optimise actual images and fonts. Hosting/publication remain separate and undecided.
7. Run type, lint, and production-build checks; inspect desktop/mobile layouts, keyboard flow, direct URLs, Back/Forward, and reduced motion. Check rendered contrast and performance with actual assets. Include focused checks for stable URLs after renaming, 404s for missing/unpublished projects, unauthorised direct admin actions, expired/tampered sessions, logout/password rotation, invalid inputs, draft/publish/edit/reorder/delete behaviour, and persistence across restart. Verify login throttling and cross-site request protection in the chosen deployment.

## Completion criteria for the future build

- Opening clearly identifies Sayantan as a software engineer and promotes no named project.
- Site resembles the selected Signal Bench, with the proposed palette reviewed on the actual composition.
- View my work, contact, and return navigation are obvious and functional.
- Adding/renaming projects needs no home-page or global-design rewrite.
- The owner can add and manage projects through the simple environment-password admin; changes persist and public views update after publication. Drafts and admin actions remain inaccessible without a valid session.
- Engineering content is credible, readable, and tied to verified personal work.
- Mobile, keyboard, reduced motion, and direct navigation work without decorative effects.
- Final public copy, visuals, contact details, resume, and deployment destination reviewed before publication.

Open decisions: final introduction/About copy; exact capabilities; project screenshots/demo status; earlier learning-project selection; resume version; hosting and the production PostgreSQL provider. The selected direction and admin scope are sufficient to start the next build session without resolving all these now.
