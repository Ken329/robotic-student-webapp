# Robotic Student Webapp

Student portal for the SteamCup robotics programme. Students sign up, wait for approval, then browse posts and competitions, view their achievements and manage their profile. A separate admin portal (`robotic-admin-webapp`) handles approvals.

## Features

| Area | What it does |
| --- | --- |
| **Sign up** | Multi-field student registration. Student sign-ups are approved by a centre and then an admin. |
| **Auth** | AWS Cognito login, forgot password, OTP verification, token refresh and a maintenance-mode page. |
| **Dashboard** | Priority-post carousel and a searchable, filterable, sortable list of posts. Shown once the student is approved; pending students see an alert instead. |
| **Post** | Post detail page. Competition posts include a sign-up form with custom fields. |
| **Competitions** | Competitions the student can join or has joined. |
| **Achievements** | Achievements grouped by year, with images. |
| **Profile** | View the student's own details. |

## Tech stack

- **React 18** with **react-router-dom 6** (routes are lazy-loaded)
- **Chakra UI 2** and Emotion for styling, Framer Motion for animation
- **Redux Toolkit** with **RTK Query** for server state, and Redux for auth/app state
- **Formik** and **Yup** for forms and validation
- **React Quill** for rendering rich-text content, **Embla Carousel** for the carousel
- **AWS Cognito** (`amazon-cognito-identity-js`) for authentication
- **CRA (react-scripts 5)** customised with **CRACO**

## Getting started

Requires Node 20 and npm.

```bash
npm ci
npm start
```

The dev server runs on [http://localhost:3000](http://localhost:3000).

### Environment variables

`craco.config.js` loads `config/.env.<DEPLOY_ENV>` and injects its values at build time. `DEPLOY_ENV` defaults to `uat`; a root `.env` can set it (for example `DEPLOY_ENV=development`).

| Variable | Purpose |
| --- | --- |
| `REACT_APP_BASE_API` | Backend API base URL |
| `REACT_APP_COGNITO_POOL_ID` | Cognito user pool ID |
| `REACT_APP_COGNITO_CLIENT_ID` | Cognito app client ID |

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the dev server |
| `npm run build` | Production build into `build/` |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix |
| `npm run format` | Format `src/` with Prettier |
| `npm test` | Run tests (none exist yet) |

## Project structure

```
src/
├── App.js              Route table (lazy-loaded pages, public and protected routes)
├── index.js            App entry: providers, theme, global styles
├── assets/             Images
├── components/         Shared UI (layout, post cards, carousel, toasts, alerts)
├── hooks/              Shared hooks (maintenance check)
├── pages/              One folder per route
├── redux/
│   ├── createAppApi.js   RTK Query base API: auth header and 401 token refresh
│   ├── store.js
│   └── slices/           Per-feature API endpoints, plus app and achievements state
├── services/           Auth, Cognito and helper functions
└── utils/              Constants, validation schemas, theme, Cognito user pool
```

Each `slices/<feature>/api.js` defines RTK Query endpoints. Pages read query results directly instead of copying them into Redux.

## Code style

- **Absolute imports only.** Relative `./` and `../` imports are an ESLint error. Use the aliases `@/`, `@components`, `@pages`, `@hooks`, `@utils`, `@redux`, `@services` and `@assets`. They are defined in both `jsconfig.json` (editor) and `craco.config.js` (webpack), so change both together.
- Imports are sorted automatically by `simple-import-sort`.
- Prettier is enforced through ESLint (double quotes, ES5 trailing commas).
- `react-hooks/exhaustive-deps` is on. Where a dependency is left out on purpose, the line has an `eslint-disable` comment.

Run `npm run lint` before committing.

## Deployment

- The `Dockerfile` builds the app in a Node 20 image and serves `build/` with nginx on port 8080 (`config/nginx.conf`). Pass `--build-arg DEPLOY_ENV=<env>` to pick the environment file.
- Pushing to the CI branches triggers GitHub Actions, which builds and pushes the Docker image to Docker Hub. A CD workflow then pulls it and restarts the container on a self-hosted runner (host port 3000).
