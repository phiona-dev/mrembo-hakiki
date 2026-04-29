# Mrembo Hakiki

*Know if your cosmetics are counterfeit. Before you buy.*

---

## Problem Statement

Kenyan cosmetic shoppers cannot distinguish counterfeit from genuine products when buying from open-air markets or local pharmacies. This leads them to purchase counterfeit goods that often contain banned substances like hydroquinone and mercury, causing skin damage, rashes, and chemical reactions. The result: health risks and wasted money.

---

## Target Users

**Primary users:** Kenyans buying cosmetics in open-air markets (e.g., Gikomba, Eastlands, Kawangware) who have access to a smartphone but may have limited data. This means v1 will use minimal data per scan (under 100KB per product lookup).

**Secondary users:** Consumers in pharmacies and retail shops who want to verify product authenticity before purchasing.

---

## MVP Scope

### In Scope for Version 1

- Scan/search product by barcode (camera scanning)
- Manual barcode entry fallback (when camera fails or barcode is damaged)
- Show product details (name, brand, category)
- Automated counterfeit flag (Counterfeit Likely / Manual Check Needed / Genuine)
- Evidence display (bullet points showing why the verdict was reached)
- Reference source display (e.g., "KEBS database 2024")
- Demo mode with pre-loaded products (works offline)
- Product not found handling (clear message + suggest demo mode)

### Out of Scope for v1 (Deferred to v2)

- No pricing or price comparison
- No user ingredient entry
- No real-time counterfeit detection for unknown products
- No admin UI (data seeded via JSON files)
- No external API integration
- No offline mode beyond demo
- No user accounts or login
- No user-submitted reports

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React + Vite | Vite provides fast hot reload during development and optimized production builds for faster page loads on limited data connections |
| Backend | Express + Node | Leverage existing JavaScript skills while improving backend architecture patterns (routes, controllers, services) |
| Database | PostgreSQL | Supports array operations for ingredient matching and foreign key constraints for data integrity of counterfeit evidence |
| Styling | Tailwind CSS | Utility-first CSS allows rapid UI iteration without context-switching to separate CSS files; keeps bundle size small |
| Auth | None for v1; JWT for v2 | No user accounts needed for v1; JWTs provide stateless authentication suitable for Express backend when user features are added in v2 |

---

## Planned Features

### v1 (Ship by Day 90)

- Barcode scanning (camera + manual fallback)
- Product lookup against seeded database (10-20 products)
- Counterfeit verdict with evidence bullets
- Demo mode with pre-loaded genuine and counterfeit examples
- Landing page with marketing sections (problem, solution, how it works, trust sources)
- Structured logging with request IDs (every request traceable)
- Health check endpoint (`/health`)

### v2 (After v1)

- Open Beauty Facts API integration (expanded product coverage)
- User-submitted counterfeit reports
- Pricing comparison by location
- Admin dashboard for data management
- Offline support (service worker)
- Rate limiting
- Request validation with Zod

---

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/phiona-dev/mrembo-hakiki.git
   cd mrembo-hakiki/backend```

````md
## Backend Setup

### Install dependencies

```bash
npm install
````

### Create `.env` file (copy from `.env.example`)

```bash
cp .env.example .env
```

Then edit `.env` with your database URL and port.

### Run database migrations

```bash
npm run migrate
```

### Seed the database with initial products

```bash
npm run seed
```

### Start the development server

```bash
npm run dev
```

---

## Frontend Setup

### Navigate to frontend folder

```bash
cd ../frontend
```

### Install dependencies

```bash
npm install
```

### Create `.env` file

```bash
cp .env.example .env
```

Then set:

```env
VITE_API_URL=http://localhost:5000
```

### Start the development server

```bash
npm run dev
```

---

## Environment Variables

### Backend (`.env`)

* `DATABASE_URL` – PostgreSQL connection string
  Example:

```env
postgresql://user:password@localhost:5432/mrembo_hakiki_dev
```

* `PORT` – Server port (default: `5000`)

### Frontend (`.env`)

* `VITE_API_URL` – Backend API URL
  Default:

```env
http://localhost:5000
```

---

## Demo Mode (No Backend Required)

To run demo mode without a backend:

1. Navigate to the frontend folder
2. Use the demo flag:

```bash
npm run dev -- --mode demo
```

3. The app will use local JSON files instead of API calls

---

## Debugging Guide

### Finding Request IDs

Every backend response includes an `X-Request-Id` header.

Use this ID to trace a specific request through logs.

Example:

```bash
curl -i http://localhost:5000/api/products/123
```

This will show:

```text
X-Request-Id: abc-123-def
```

---

### Backend Logs

Logs are in JSON format, one line per request.

View in real-time:

```bash
npm run dev
```

This shows logs in the console.

Each log includes:

* method
* path
* duration
* status
* requestId
* timestamp

To save logs to a file:

```bash
npm run dev > logs.txt
```

---

### Frontend Logs

Open browser DevTools (`F12`) → **Console** tab

Frontend logs include the same `requestId` from backend responses.

The **Network** tab shows full request/response details.

---

## Common Issues

### Product Not Found

* Verify barcode exists in `backend/seed-data/products.json`
* Check barcode format (expecting 13 digits, numeric only)
* Look for `product_lookup_failed` in backend logs with the `requestId`

---

### Verdict Incorrect

* Check `evidence` array in API response (use browser Network tab)
* Verify scoring rules in:

```text
backend/src/services/counterfeitScoring.js
```

* Test with seeded product that has a known verdict

---

### Database Connection Error

Verify PostgreSQL is running:

Linux:

```bash
sudo systemctl status postgresql
```

Mac:

```bash
brew services list
```

Check `DATABASE_URL` in `.env` file

Test connection:

```bash
psql $DATABASE_URL
```

---

### Camera Not Working

* Ensure using HTTPS or `localhost` (browsers require secure context for camera)
* Check browser permissions (look for camera icon in address bar)
* Use manual barcode input as fallback
* Test with `/demo` route to verify the rest of the app works

---

### Request Timeout

* Check backend logs for slow queries
* Look for `duration` field in logs (should be under 500ms for product lookup)
* Add `console.time()` in suspect functions

---

## Project Status

### Current Sprint

**Sprint 1 (Days 1–10)**

### Completed

* Day 1: Product definition and vision
* Day 2: MVP scope definition
* Day 3: User stories
* Day 4: Wireframes
* Day 5: GitHub repo + README

### In Progress

* Day 6: Frontend setup (Vite + React + Routes)
* Day 7: Backend setup (Express folder structure)

### Next

* Day 8: PostgreSQL setup + migrations
* Day 9: Architecture Decision Records
* Day 10: Seed data + debugging practice

---

## License

MIT

---

## Acknowledgments

Reference data sourced from KEBS (Kenya Bureau of Standards) guidelines.

Built as part of a software engineering learning project focused on system design, debugging, and business context.

```
```
