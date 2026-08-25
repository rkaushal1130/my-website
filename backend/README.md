# NeverQuit.ai Enterprise Backend API

Production-ready RESTful backend API engine for **NeverQuit.ai**, built with Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM.

---

## Table of Contents
1. [Architecture & Overview](#1-architecture--overview)
2. [Prerequisites](#2-prerequisites)
3. [Environment Variables](#3-environment-variables)
4. [PostgreSQL Database Setup](#4-postgresql-database-setup)
5. [Prisma Migrations](#5-prisma-migrations)
6. [Database Seeding](#6-database-seeding)
7. [Starting the Development Server](#7-starting-the-development-server)
8. [Automated Testing Suite](#8-automated-testing-suite)
9. [Production Build & Execution](#9-production-build--execution)
10. [REST API Documentation & Endpoints](#10-rest-api-documentation--endpoints)
11. [Authentication & Authorization](#11-authentication--authorization)
12. [Security Hardening](#12-security-hardening)
13. [Deployment Guide](#13-deployment-guide)

---

## 1. Architecture & Overview

The NeverQuit.ai backend follows an enterprise layered architecture:

```
backend/
├── prisma/
│   ├── schema.prisma           # Prisma schema (User, Project, Job, Contact, Application)
│   ├── migrations/             # Idempotent SQL migration files
│   └── seed.ts                 # Idempotent database seeder
├── src/
│   ├── config/                 # Environment validation, Prisma client, DB fallbacks
│   ├── controllers/            # Request handlers & standard response dispatchers
│   ├── middleware/             # Central error handler, auth guards, rate limiters
│   ├── routes/                 # Express route definitions
│   ├── services/               # Core business logic & database transactions
│   ├── types/                  # Shared TypeScript interfaces & safe entities
│   ├── utils/                  # Structured logger, JWT helpers, Bcrypt utilities
│   ├── validators/             # Strict Zod schemas for all inbound payloads
│   ├── app.ts                  # Express application setup, Helmet, CORS, parser
│   ├── server.ts               # Server bootstrap & graceful shutdown listeners
│   └── test-backend.ts         # 39-step automated end-to-end integration test runner
```

---

## 2. Prerequisites

Ensure you have the following installed on your host system:
- **Node.js**: `v18.0.0` or higher (Node 20+ Recommended)
- **npm**: `v9.0.0` or higher
- **PostgreSQL**: `v14.0` or higher (or a cloud instance via Supabase, Neon, AWS RDS, GCP Cloud SQL)

---

## 3. Environment Variables

Create a `.env` file inside the `backend/` directory by copying `.env.example`:

```bash
cp .env.example .env
```

### Configuration Keys:

| Variable | Type | Default / Example | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | `5000` | Port on which Express API listens |
| `NODE_ENV` | String | `development` | Environment mode (`development`, `production`, `test`) |
| `DATABASE_URL` | String | `postgresql://user:password@localhost:5432/neverquit_db?schema=public` | PostgreSQL connection string |
| `JWT_SECRET` | String | *Custom 256-bit Secret* | Cryptographic signing key for JWT tokens |
| `FRONTEND_URL` | String | `http://localhost:3000` | Whitelisted frontend origin for CORS |
| `ADMIN_EMAIL` | String | `admin@neverquit.ai` | Initial administrator email for seeding |
| `ADMIN_PASSWORD` | String | *Secure password* | Initial administrator password for seeding |

> [!IMPORTANT]
> In production environments (`NODE_ENV=production`), `DATABASE_URL` and a strong `JWT_SECRET` (minimum 16 characters) are strictly enforced by runtime Zod validation.

---

## 4. PostgreSQL Database Setup

Create a dedicated database for NeverQuit.ai in your PostgreSQL instance:

```sql
CREATE DATABASE neverquit_db;
CREATE USER neverquit_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE neverquit_db TO neverquit_user;
```

Update your `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL="postgresql://neverquit_user:your_secure_password@localhost:5432/neverquit_db?schema=public"
```

---

## 5. Prisma Migrations

Generate the type-safe Prisma client and execute migrations to apply the schema:

```bash
# Generate Prisma Client types
npm run prisma:generate

# Create and apply new migrations in development
npx prisma migrate dev --name initial_neverquit_database

# Apply existing migrations in production / CI/CD
npx prisma migrate deploy
```

---

## 6. Database Seeding

Populate the database with initial administrator credentials, showcase projects, and open career openings:

```bash
npm run prisma:seed
```

The seed script is **idempotent** (safe to run multiple times without duplicating records).

---

## 7. Starting the Development Server

Start the live TypeScript development server with hot module reloading:

```bash
npm run dev
```

The API engine will start on `http://localhost:5000` (or your configured `PORT`).

---

## 8. Automated Testing Suite

Run the full end-to-end integration test suite verifying 39 distinct test scenarios:

```bash
npm run test
```

### Scenarios Tested:
- `GET /api/health`
- Auth: Register, duplicate email handling, validation errors, Login, Invalid passwords, Token verification, Logout
- Contact: Form submissions, field requirements, role guards (401/403), admin pagination & status updates
- Projects: Public filtering, non-admin blocks (403), admin CRUD, slug uniqueness (409), slug lookups (404/200)
- Jobs: Public listings, admin CRUD, duplicate slugs, slug lookups, salary updates
- Applications: Submissions, email validation, cover letter requirements, admin candidate tracking

---

## 9. Production Build & Execution

Compile TypeScript to optimized JavaScript artifacts:

```bash
# Clean dist/ and compile TypeScript
npm run build

# Start production server
npm run start
```

---

## 10. REST API Documentation & Endpoints

All responses adhere strictly to the NeverQuit.ai unified contract:

**Success Response Format:**
```json
{
  "success": true,
  "data": {},
  "message": "Operation description"
}
```

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

### Endpoints Matrix:

| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System health check & uptime status |
| `POST` | `/api/auth/register` | Public | Register new standard user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue JWT cookie/header |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current session profile |
| `POST` | `/api/auth/logout` | Authenticated | Invalidate authentication session |
| `POST` | `/api/contact` | Public (Rate limited) | Submit customer inquiry message |
| `GET` | `/api/contact` | Admin Only | List paginated inquiries with status filter |
| `GET` | `/api/contact/:id` | Admin Only | Get single inquiry details |
| `PATCH` | `/api/contact/:id` | Admin Only | Update inquiry status (`NEW`, `READ`, `REPLIED`, `ARCHIVED`) |
| `DELETE`| `/api/contact/:id` | Admin Only | Delete inquiry message |
| `GET` | `/api/projects` | Public (Published only) | List showcase projects |
| `GET` | `/api/projects/:slug` | Public (Published only) | Retrieve project by unique slug |
| `POST` | `/api/projects` | Admin Only | Create new showcase project |
| `PATCH` | `/api/projects/:id` | Admin Only | Update existing project |
| `DELETE`| `/api/projects/:id` | Admin Only | Delete showcase project |
| `GET` | `/api/jobs` | Public (Published only) | List open career vacancies |
| `GET` | `/api/jobs/:slug` | Public (Published only) | Retrieve job opening by unique slug |
| `POST` | `/api/jobs` | Admin Only | Create new recruitment vacancy |
| `PATCH` | `/api/jobs/:id` | Admin Only | Update job opening details |
| `DELETE`| `/api/jobs/:id` | Admin Only | Delete job opening |
| `POST` | `/api/applications` | Public (Rate limited) | Submit career application |
| `GET` | `/api/applications` | Admin Only | List candidate applications with filters |
| `GET` | `/api/applications/:id` | Admin Only | Get single candidate pitch & resume link |
| `PATCH` | `/api/applications/:id` | Admin Only | Advance candidate stage (`RECEIVED` → `HIRED`) |
| `DELETE`| `/api/applications/:id` | Admin Only | Delete applicant record |

---

## 11. Authentication & Authorization

- **Password Security**: Passwords are cryptographically hashed using **Bcrypt with 12 salt rounds**.
- **Session Tokens**: JWT tokens are signed with HMAC-SHA256 and valid for **7 days**.
- **Transport Security**: Delivered simultaneously via `Authorization: Bearer <token>` header and secure, `HttpOnly`, `SameSite=Strict` cookies.
- **Role Enforcement**:
  - `authenticate`: Validates JWT token and injects `req.user`.
  - `requireAdmin`: Enforces `req.user.role === 'ADMIN'` on the backend source of truth.

---

## 12. Security Hardening

- **Helmet**: Disables MIME sniffing (`nosniff`), frame embedding (`SAMEORIGIN`), DNS prefetching, and enforces HSTS in production.
- **Strict CORS**: Production whitelist permits only the verified `FRONTEND_URL`; prohibits wildcard `*` with credentials.
- **Tiered Rate Limiting**:
  - Global API: 300 requests / 15 minutes.
  - Login: 10 attempts / 15 minutes (brute-force defense).
  - Registration: 5 requests / hour.
  - Contact Submissions: 5 requests / 10 minutes.
  - Job Applications: 5 requests / 15 minutes.
- **Sensitive Data Redaction**: The central logger automatically masks `password`, `token`, `secret`, `authorization`, and credentials.
- **Request Size Limiting**: JSON and URL-encoded bodies capped at **1MB** to prevent buffer exhaustion DoS.
- **Zero Raw Leaks**: Database internal errors, stack traces, and system file paths are never exposed in API responses.

---

## 13. Deployment Guide

### Option A: PM2 on Linux VPS (Ubuntu / Debian)

```bash
# 1. Clone repository & install dependencies
git clone https://github.com/rkaushal1130/my-website.git
cd my-website/backend
npm ci

# 2. Setup production environment
cp .env.example .env
nano .env

# 3. Migrate and build
npm run prisma:migrate
npm run build

# 4. Start with PM2 Process Manager
npm install -g pm2
pm2 start dist/server.js --name "neverquit-api" -i max
pm2 save
pm2 startup
```

### Option B: Docker Containerization

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

---

## License
MIT License © 2026 NeverQuit.ai Engineering Team. All rights reserved.
