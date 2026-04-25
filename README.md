# Chirpy HTTP Server

A TypeScript/Node.js REST API server for a simple social platform called "Chirpy". It features user authentication, user management, and a basic "chirps" (posts) system, using Express and Drizzle ORM for PostgreSQL.

## Features

- User registration and login with JWT authentication
- CRUD operations for chirps (posts)
- Admin endpoints for metrics and health checks
- Database migrations and schema management with Drizzle ORM
- Minimal static frontend

## Project Structure

```
├── drizzle.config.ts         # Drizzle ORM configuration
├── package.json             # Project metadata and scripts
├── tsconfig.json            # TypeScript configuration
├── src/
│   ├── api/                 # API route handlers
│   ├── app/                 # Static frontend assets
│   ├── db/                  # Database schema, queries, migrations
│   ├── auth.ts              # Auth helpers (JWT, password hashing)
│   ├── config.ts            # App configuration
│   └── index.ts             # Main server entry point
```

## Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Configure environment:**
    - Set required environment variables (see `src/config.ts`).
    - Example: `DATABASE_URL`, `JWT_SECRET`, etc.
3. **Run database migrations:**
    ```bash
    npm run migrate
    ```
4. **Start the server:**
    ```bash
    npm run dev
    ```
    Or build and run:
    ```bash
    npm run build
    npm start
    ```

## Scripts

- `npm run dev` — Compile and run in development mode
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run the compiled server
- `npm run migrate` — Run database migrations
- `npm run test` — Run tests
- `npm run format` — Format code with Prettier

## API Endpoints

- `POST /api/auth/login` — User login
- `POST /api/users` — Create user
- `GET /api/chirps` — List chirps
- `POST /api/chirps` — Create chirp
- `DELETE /api/chirps/:id` — Delete chirp
- `GET /api/healthz` — Health check
- `GET /admin/metrics` — Metrics

## License

MIT License.

---

_Created for learning and demonstration purposes._
