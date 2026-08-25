# NeverQuit.ai — Enterprise AI Platform

```text
NeverQuit.ai
│
├── frontend/ (my-app)
│   ├── React 18
│   ├── Vite
│   ├── Three.js / Canvas Interactive FX
│   └── Tailwind CSS (Signature Black / Red Cyber-Aesthetic)
│
└── backend/
    ├── Node.js
    ├── Express
    ├── TypeScript
    ├── Prisma ORM
    ├── PostgreSQL
    ├── JWT Authentication & HttpOnly Cookies
    └── Zod Runtime Schema Validation
```

---

## 🌟 Overview

**NeverQuit.ai** is a full-stack, enterprise-grade AI agency and autonomous reasoning platform. It pairs an immersive, high-performance cyberpunk frontend with a hardened, scalable TypeScript REST API engine backed by PostgreSQL.

---

## 🏗️ Architecture & Technology Stack

### **Frontend (`my-app/`)**
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS with custom neon glow utilities, glassmorphism backdrops, and black/red color palettes
- **3D & Visuals:** Three.js / Canvas interactive particles and neural grid visualizers
- **Routing:** React Router v6 with protected admin routes and public marketing pages
- **State & API:** Centralized API client (`src/services/api.js`), AuthContext session provider, and real-time form feedback

### **Backend (`backend/`)**
- **Runtime & Language:** Node.js (v18+) + TypeScript
- **Web Framework:** Express 4 with layered architecture (`controllers`, `services`, `middleware`, `validators`)
- **Database & ORM:** PostgreSQL + Prisma ORM (idempotent migrations and multi-entity seeds)
- **Security & Hardening:** Helmet security headers, CORS origin whitelisting, tiered rate limiters, 1MB body parser caps, and Bcrypt(12) password hashing
- **Validation & Types:** Strict Zod runtime schemas across all endpoints
- **Testing:** 39-step automated end-to-end integration test harness (`src/test-backend.ts`)

---

## 🚀 Quick Start Guide

### 1. Start the Backend API

```bash
cd backend
npm install
cp .env.example .env

# Generate Prisma types, run migrations & seed
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start development server on port 5000
npm run dev
```

### 2. Start the Frontend Application

```bash
cd my-app
npm install

# Start Vite development server on port 3000
npm run dev
```

---

## 🧪 Running Automated Tests

```bash
cd backend
npm run test
```

Verifies 39 integration scenarios across Health, Authentication, Contact Inquiries, Projects Showcase, Job Recruitment, and Candidate Applications.

---

## 📖 Sub-Project Documentation

- **Backend Detailed Manual:** [backend/README.md](file:///C:/Users/msila/OneDrive/Desktop/VSCode/my%20website/backend/README.md)
- **Frontend Source Directory:** [my-app/src](file:///C:/Users/msila/OneDrive/Desktop/VSCode/my%20website/my-app/src)

---

## 📜 License
MIT License © 2026 NeverQuit.ai Engineering Team. All rights reserved.
