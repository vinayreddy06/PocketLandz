# Pocket Landz Full Stack Starter

This is a real runnable starter project for **Pocket Landz**, using:

- **Frontend:** React + Vite
- **Backend API:** Node.js + Express
- **Data:** Fake Hyderabad land/plot data

## Project structure

```bash
pocket-landz-fullstack/
  frontend/
  backend/
  README.md
```

## 1) Run the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```bash
http://localhost:4000
```

API base:

```bash
http://localhost:4000/api
```

## 2) Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

## Included API endpoints

- `GET /api/health`
- `GET /api/stats`
- `GET /api/areas`
- `GET /api/listings`
- `GET /api/listings/:id`
- `GET /api/trends`
- `GET /api/testimonials`
- `POST /api/leads`

## Example lead payload

```json
{
  "name": "Varun",
  "email": "varun@example.com",
  "phone": "9876543210",
  "interest": "Kokapet"
}
```

## What this version includes

- homepage hero section
- area cards
- live search and filters
- featured listings
- compare up to 3 projects
- trend chart section
- map preview section
- lead capture form connected to backend
- testimonials from API

## Good next upgrades

- connect a real database like PostgreSQL or MongoDB
- add an admin dashboard
- store leads in database
- add listing details pages
- add authentication
- replace fake map with Google Maps or Mapbox
- deploy frontend to Vercel and backend to Render/Railway
