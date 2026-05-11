# AGENTS.md

## Project

Playwright practice/learning repo for QA testing. Tests target external apps (Sauce Demo, QA Playground, Automation Exercise). No build step, no lint, no typecheck.

## Commands

- `npx playwright test` — run all tests
- `npx playwright test <path>` — run a single file or directory
- `npx playwright test --headed` — run with browser UI
- `npx playwright test --grep "pattern"` — filter by test name
- `npx playwright install --with-deps` — install browsers (required first run or after lockfile change)

## Architecture

- `playwright.config.ts` — only **Firefox** project is active; Chromium and WebKit are commented out
- `tests/` — test specs organized by topic:
  - `login_test.spec.ts` — login via POM against `saucedemo.com`
  - `input-fields/` — form/interaction tests against `qaplayground.com`
  - `mock/` — request interception/mocking against `automationexercise.com`
  - `api/` — API tests (currently all commented out)
  - `fixtures/` — custom fixture definitions and demos
- `pages/` — Page Object Model classes (`loginPage.ts`)
- `test-data/` — JSON fixtures imported directly into specs

## Conventions

- **Data-driven tests**: `loginData.json` uses a `run` boolean flag per case to enable/disable individual data rows. Follow this pattern when adding data-driven tests.
- **Custom fixtures**: `tests/fixtures/fixture.ts` extends Playwright's `test` with `helloWorld`, `greatDay` (test-scoped) and `cupOfCoffee` (worker-scoped). Specs that need these must import from `./fixture` not from `@playwright/test`.
- **Locators**: prefer `data-test` attributes (Sauce Demo) or `getByTestId()` (QA Playground) over CSS selectors.
- **`// @ts-check`**: some spec files use JSDoc type checking without a `tsconfig`. Do not add TypeScript compiler config.

## CI

`.github/workflows/main.yml` runs on push to `main` and PRs:
- Node 18 on ubuntu-latest
- `npm ci` → `npx playwright install --with-deps` → `npx playwright test`
- HTML report uploaded as artifact
- CI config: retries=2, workers=1, `forbidOnly` enabled

## Config quirks

- `.env` loading is commented out in `playwright.config.ts`; the repo does not use environment variable files currently
- No `baseURL` is set in config; each spec navigates to its own target URL
- Trace collection: `on-first-retry` (only useful on CI since local retries=0)
- No lint, format, or typecheck tooling configured
