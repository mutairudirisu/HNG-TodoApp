# Agent Instructions & Guidelines

## 🎯 Mandatory Directives

### 1. Write Tests for All Endpoints
Whenever you create or modify any backend endpoint:
- **Unit & Integration Tests**: You **must** write comprehensive tests covering the endpoint at both the controller and service levels.
- **Required Test Scenarios**:
  - **Happy Path**: Successful creation, retrieval, update, or deletion with expected HTTP status codes (`200 OK`, `201 Created`, `204 No Content`).
  - **Input Validation**: Ensure invalid, missing, or malformed request payloads trigger appropriate validation errors (`400 Bad Request`).
  - **Edge Cases & Error Handling**: Verify proper handling of non-existent resource IDs (`404 Not Found`), boundary values, and constraint violations.
  - **State & Ordering Persistence**: Verify that database operations (such as drag-and-drop position reordering and status changes) persist correctly in SQLite.

### 2. Always Validate Endpoints are Working Well
- **Execute Automated Tests**: Never conclude an implementation without running the test suite (`npm run test` in the `backend/` directory). All tests must pass with 0 errors.
- **Active Live Verification**: When dev servers are running, validate the endpoints with actual HTTP requests (e.g. via PowerShell `Invoke-RestMethod` or `curl`) to verify the live database interaction, response headers, and payload structures.
- **Frontend Integration Check**: Ensure the frontend API client (`frontend/src/lib/api.js` or equivalent) properly consumes the endpoint contracts, handles error states, and updates UI components without regressions.

---

## 🏗️ Project Architecture & Layout

```
Todo-Application/
├── backend/                   # NestJS + TypeORM + SQLite API (Port 3001)
│   ├── src/
│   │   ├── todo/              # Todo Module (controller, service, entity, dto)
│   │   ├── app.module.ts      # Root module & TypeORM SQLite config
│   │   └── main.ts            # Nest bootstrap, CORS & validation pipes
│   ├── test/                  # E2E test suite
│   ├── vitest.config.ts       # Test configuration (Vitest)
│   └── package.json           # Backend dependencies and test scripts
│
├── frontend/                  # Next.js 16 (App Router) (Port 3000)
│   ├── src/
│   │   ├── app/               # Next.js App Router (layout, page, styles)
│   │   ├── components/        # UI components (Header, TodoItem, FilterBar, etc.)
│   │   └── lib/api.js         # Backend API client
│   └── package.json           # Frontend dependencies
│
├── AGENTS.md                  # Agent guidelines and behavioral rules
└── package.json               # Root launcher (concurrently runs both servers)
```

---

## 🧪 Testing Commands

### Backend Tests
From the root or `backend/` folder:
- **Run all unit & integration tests:**
  ```bash
  npm run test --prefix backend
  ```
  *(Or `npm run test` from inside the `backend` directory)*

- **Run tests in watch mode during development:**
  ```bash
  npm run test:watch --prefix backend
  ```

- **Run E2E tests:**
  ```bash
  npm run test:e2e --prefix backend
  ```

---

## 📋 Best Practices for Code Changes
1. **Thin Controllers, Rich Services**: Keep controller methods focused on routing and HTTP concerns; encapsulate business logic, sorting, and database queries in injectable services.
2. **DTOs & Validation**: Always define strong TypeScript classes with `class-validator` decorators (`@IsString()`, `@IsNotEmpty()`, `@IsOptional()`, `@IsEnum()`, etc.) for request bodies and query parameters.
3. **Database Integrity**: Ensure TypeORM entity changes maintain backward compatibility or properly update SQLite schema.
4. **Documentation**: Keep the `README.md` API endpoints table up to date whenever routes or payloads change.
