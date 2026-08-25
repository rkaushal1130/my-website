# NeverquiT.ai Backend API

Production-ready backend API built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

---

## 🛠️ Tech Stack & Architecture

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma ORM with PostgreSQL
- **Validation**: Zod
- **Security**: Helmet, CORS, Express-Rate-Limit
- **Logging**: Morgan & custom structured logger
- **Configuration**: dotenv with type-safe Zod schema validation

---

## 📁 Directory Structure

```
backend/
├── src/
│   ├── config/          # Environment variables & Prisma client configuration
│   ├── controllers/     # Route request handlers
│   ├── middleware/      # Zod validation, error handling, rate limiting & 404
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic & database operations
│   ├── validators/      # Zod request validation schemas
│   ├── utils/           # Response helpers & logger
│   ├── types/           # TypeScript interfaces & types
│   ├── app.ts           # Express application configuration
│   └── server.ts        # Server entry point & graceful shutdown
├── prisma/
│   └── schema.prisma    # PostgreSQL database schema & models
├── .env                 # Environment configuration
├── .env.example         # Example environment template
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your PostgreSQL connection string:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/neverquit_db?schema=public"
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:3000"
```

### 3. Generate Prisma Client & Migrate Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

---

## 📡 API Endpoints

### 🩺 Health Check
- `GET /api/health`
  - **Response**:
    ```json
    {
      "success": true,
      "message": "NeverQuit.ai API is running",
      "name": "NeverquiT.ai API",
      "status": "UP",
      "uptime": 12.34,
      "timestamp": "2026-08-25T12:00:00.000Z",
      "environment": "development",
      "version": "1.0.0"
    }
    ```

### ✉️ Contact Inquiries
- `POST /api/contact` — Submit a contact inquiry form
- `GET /api/contact` — List all inquiries

### 📅 Demo Bookings
- `POST /api/demo` — Book a live enterprise demo session
- `GET /api/demo` — List all demo requests

### 💼 Careers & Job Applications
- `POST /api/careers` — Submit an application for an open position
- `GET /api/careers` — List all applications

---

## 🔨 Available Scripts

- `npm run dev`: Starts development server with live reload (`ts-node-dev`)
- `npm run build`: Compiles TypeScript to `dist/`
- `npm run start`: Runs compiled production build from `dist/server.js`
- `npm run prisma:generate`: Generates Prisma client types
- `npm run prisma:migrate`: Applies migrations to PostgreSQL database
- `npm run prisma:studio`: Opens visual Prisma database GUI
