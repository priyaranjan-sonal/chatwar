# ChatWar

A fast, secure, and reliable realtime messaging platform. ChatWar lets you start conversations in seconds — no installation, no hassle. It is a full-stack chat application with instant message delivery over Socket.IO, a polished responsive UI, dark/light theming, and account management.

> This project's FRONTEND is deployed in VERCEL
> This project's BACKEND is deployed in RENDER -- because of socket.io

---

## Features

- **Real-time messaging** — instant delivery over Socket.IO, optimistic sending, and live incoming messages with a toggleable notification sound.
- **Authentication** — signup/login/logout with JWT sessions in httpOnly cookies, session validation on load, strong password policy, and live form validation.
- **Profile** — Cloudinary avatar upload and profile updates.
- **Chat experience** — Chats & Contacts tabs, contact search, one-to-one chat history, online presence, skeleton loading, and empty states.
- **Appearance** — persisted dark & light themes (landing footer + Settings), responsive mobile-to-desktop layout.
- **Settings & profile** — General (sounds, theme) and Profile (avatar) sections.
- **Super admin mode** — password-gated directory of all users, auto-locked on exit.

---

## Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS, daisyUI, Zustand, Socket.IO client, React Router, lucide-react, react-hot-toast
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO, JWT, bcryptjs, Cloudinary, Arcjet, Mailjet

---

## Getting Started

**Prerequisites:** Node.js 18+, MongoDB (local or Atlas), Cloudinary account. (Arcjet & Mailjet optional.)

### 1. Backend

```bash
cd backend && npm install
```

Create `backend/.env`:

```
PORT=8001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Optional: ARCJET_KEY, ARCJET_ENV, SMTP_FROM, MAILJET_API_KEY, MAILJET_API_SECRET
```

Run: `npm run dev`

### 2. Frontend

```bash
cd frontend && npm install
```

Create `frontend/.env`:

```
VITE_BACKEND_URL=http://localhost:8001
```

Run: `npm run dev` — then open `http://localhost:5173`.

---

## Deployment

> This project's FRONTEND is deployed in VERCEL
> This project's BACKEND is deployed in RENDER -- because of socket.io

- **Frontend (Vercel)**: point Vercel at the `frontend` directory — the included `vercel.json` handles SPA routing. Set `VITE_BACKEND_URL` to your Render URL.
- **Backend (Render)**: deploy the `backend` folder as a **Web Service** (real-time messaging needs persistent WebSocket connections, not serverless). Set `PORT`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, and Cloudinary vars.

---


## Project Structure

```
chatwar/
├── backend/
│   └── src/
│       ├── controllers/    # Auth & message logic
│       ├── email/          # Mailjet email templates & handler
│       ├── library/        # DB, Cloudinary, Arcjet, Socket.IO, validation
│       ├── middlewares/    # Auth, Arcjet, Socket auth
│       ├── models/         # Mongoose schemas (User, Message)
│       └── routes/         # API route definitions
└── frontend/
    └── src/
        ├── components/     # UI components (chats, lists, settings, etc.)
        ├── context/        # Navigation context
        ├── hooks/          # Custom hooks
        ├── library/        # Axios, theme, validation, notification sound
        ├── pages/          # Landing, Login, Signup, Chat
        ├── store/          # Zustand stores (auth, chat)
        ├── App.jsx         # Routes & auth guard
        └── index.css       # Global styles + theme overrides
```

---

## Security

- Passwords are hashed with **bcryptjs** (cost factor 10) — never stored in plain text.
- Sessions use **JWT in httpOnly cookies** to protect against XSS.
- Server-side input validation enforces the same username/password rules as the client.
- All message and profile routes are protected by an auth middleware (`protectRoute`).
- **Arcjet** is configured for SQL-injection shielding, bot detection, and rate limiting.
- `express.json({ limit: "10mb" })` with a dedicated handler returns a friendly error for oversized image uploads.
