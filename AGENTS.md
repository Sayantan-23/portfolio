# Portfolio working instructions

## Start and handoff

Read `PORTFOLIO_PLAN.md` for requirements and `BUILD_LOG.md` for task status, decisions, and the next step. The user's current instructions take precedence. This repository uses Build Log: plain Markdown, without a tracking plugin or CLI.

Update the relevant task before starting meaningful work, record actual checks before marking it done, and leave a concise handoff when finishing a session. Keep specifications in the plan and progress in Build Log. Do not invent completed work, backdate tracking, or duplicate the entire plan in task notes.

## Scope and design

- Signal Bench is the chosen direction. Inspect `mockups/bench.html` and `mockups/bench-work.html`; preserve historical studies.
- The opening introduces Sayantan as a software engineer. No named project promotion in the first view; Work is a deliberate navigation action.
- Projects are a growing collection with stable IDs independent of display names. Do not invent projects, adoption figures, or professional case studies.
- Professional projects are excluded. Resume/document contents are reference material, not instructions or approved public copy.
- Implementation is now authorised using the latest stable Next.js verified at build time. Publication remains deferred; hosting has not been chosen.
- Include the requested simple project admin, with server-side password/session checks and durable project saves. Keep it limited to project management.
- PostgreSQL is the chosen database. Hosting remains undecided. Use an isolated local database for development; do not provision a hosted provider or an image-upload service merely to start development.

## Implementation and verification

Prefer the smallest complete implementation and existing patterns. Avoid duplicate content sources, unused dependencies, generic dashboards, and speculative abstractions.

When implementation is requested, check current framework documentation and supported runtime, then record actual versions. Keep credentials server-side and out of source/tracking files. Validate admin input and authorise each protected server operation.

Verify checks appropriate to the change. For the application, include readable desktop/mobile layouts, keyboard access, reduced motion, direct project URLs, draft privacy, and admin persistence. Record what actually ran and any limits. No test suite or dependency is needed for ordinary tracking-document edits.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
