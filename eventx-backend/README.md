# EventX Studio — Backend (Node.js + Express + MongoDB)

A production-ready backend for the Event Management System described in your Final Project proposal.
It includes JWT auth with roles, event CRUD, seat booking, QR-code tickets, check-in, analytics,
CSV export, and basic notifications (email optional).

## Quick Start

```bash
# 1) Setup
cp .env.example .env
# edit .env with your values

# 2) Install deps
npm i

# 3) Run MongoDB locally or use MongoDB Atlas
#    Update MONGODB_URI in .env

# 4) Seed sample data (creates admin & user, plus sample events)
npm run seed

# 5) Start the server
npm run dev
```

Default Admin (from seed):
- email: admin@eventx.local
- password: Admin@123

Default User (from seed):
- email: user@eventx.local
- password: User@123

## API Base URL
`/api/v1`

See `src/docs/openapi.yaml` for a structured overview (you can import into Postman/Insomnia).

## Main Features
- Auth: Register, Login, Me (JWT in HTTP-only cookies or Authorization header).
- Roles: `admin`, `user` with route guards.
- Events: CRUD (admin), list & details (public).
- Tickets: seat selection, booking, QR generation, my tickets, check-in.
- Analytics: revenue, tickets sold, attendees, demographics, per-event summary.
- CSV Export: events & sales.
- Notifications: email on booking (optional SMTP) + scheduled reminders (demo cron).

## Project Structure
```
src/
  app.js
  server.js
  config/db.js
  models/
  controllers/
  routes/
  middleware/
  utils/
  seed/
  docs/
```

## Deployment
- Any Node 18+ platform (Render/Heroku/Fly.io). Set env vars and `npm start`.
- Use MongoDB Atlas, and set `CLIENT_URL` to your frontend origin for CORS.
