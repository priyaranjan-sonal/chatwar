# ChatWar

A fast, secure, and reliable realtime messaging platform. ChatWar lets you start conversations in seconds — no installation, no hassle. It is a full-stack chat application with instant message delivery over Socket.IO, a polished responsive UI, dark/light theming, and account management.

> This project's FRONTEND is deployed in VERCEL
> This project's BACKEND is deployed in RENDER -- because of socket.io

---

## Features

### Real-time messaging
- Messages are delivered the moment they are sent over a **Socket.IO** connection — no refresh required.
- **Optimistic sending**: your message appears instantly, then reconciles with the server response.
- Incoming messages are appended live to the open conversation, and the **notification sound** plays when a new message arrives (toggleable).

### Authentication & accounts
- Full **signup / login / logout** flow with JSON Web Token sessions stored in httpOnly cookies.
- **Instant session validation** on app load (`/api/auth/check`) with automatic redirects to the correct page.
- **Username validation** (3–20 chars, lowercase letters, digits, underscores) and a **strong password policy** (8+ chars, must include letters, digits, and special characters).
- Live, real-time validation feedback on the signup and login forms.
- **Profile picture upload** with Cloudinary, plus profile updates.

### Chat experience
- **Chats & Contacts** tabs to switch between your existing conversations and all available users.
- One-to-one chat history, with messages stored and fetched per conversation.
- **Search contacts** by username to start new conversations quickly.
- Online presence indicator synced across clients through Socket.IO.
- Skeleton loading states and empty-state placeholders for a polished feel.

### Appearance
- **Dark & Light themes** that persist across the whole app (single source of truth in the store, stored in `localStorage`).
- Theme toggle available on the landing page footer and in **Settings → Theme**.
- Responsive layout that adapts from mobile to desktop (panel-based sidebar + chat view).

### Settings & profile
- Settings sidebar with **General** (notification sounds, theme) and **Profile** (avatar, display info) sections.
- Per-user preferences for **message sound notifications**.

### Super admin mode
- Shielded **Super Admin** mode to browse all registered users — gated behind a password prompt and automatically locked when leaving the app or entering settings.

---

## Tech Stack

### Frontend
- **React 19** + **Vite 8**
- **Tailwind CSS 3** + **daisyUI 5**
- **Zustand** — global state management
- **Socket.IO client** — realtime communication
- **React Router 7** — routing
- **lucide-react** — icons
- **react-hot-toast** — notifications

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Socket.IO** — realtime event delivery
- **JSON Web Tokens** (httpOnly cookies) for authentication
- **bcryptjs** — password hashing
- **Cloudinary** — image uploads (profile pictures, message images)
- **Arcjet** — bot detection & rate limiting (wired, configurable)
- **Mailjet** — email service (configured)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local instance or MongoDB Atlas)
- A Cloudinary account for image uploads
- (Optional) Arcjet and Mailjet accounts for security/email features

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatwar.git
cd chatwar
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

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

# Optional — Arcjet security
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

# Optional — Mailjet emails
SMTP_FROM=no-reply@example.com
MAILJET_API_KEY=your_mailjet_key
MAILJET_API_SECRET=your_mailjet_secret
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```
VITE_BACKEND_URL=http://localhost:8001
```

Run the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Deployment

> This project's FRONTEND is deployed in VERCEL
> This project's BACKEND is deployed in RENDER -- because of socket.io

- **Frontend (Vercel)**: build the frontend with `npm run build` and point Vercel at the `frontend` directory. The included `vercel.json` rewrites all routes to `index.html` for client-side routing support. Set `VITE_BACKEND_URL` to your Render backend URL.
- **Backend (Render)**: deploy the `backend` folder as a **Web Service**. Because realtime messaging relies on persistent Socket.IO connections (WebSockets), a long-running server — rather than a serverless function — is required. Set the `PORT`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, and Cloudinary variables in Render's environment settings.

---

## API Overview

| Method | Endpoint                    | Description                          | Auth |
|--------|-----------------------------|--------------------------------------|------|
| POST   | `/api/auth/signup`          | Register a new account               | No   |
| POST   | `/api/auth/login`           | Log in with username & password      | No   |
| POST   | `/api/auth/logout`          | End the session                      | No   |
| GET    | `/api/auth/check`           | Validate the current session         | Yes  |
| PUT    | `/api/auth/update-profile`  | Update profile (Cloudinary upload)   | Yes  |
| GET    | `/api/messages/contacts`    | List all users (contacts)            | Yes  |
| GET    | `/api/messages/chats`       | List users you have chatted with     | Yes  |
| GET    | `/api/messages/:id`         | Get message history with a user      | Yes  |
| POST   | `/api/messages/send/:id`    | Send a text or image message         | Yes  |

### Socket events

| Event              | Direction  | Payload              | Purpose                          |
|--------------------|------------|----------------------|----------------------------------|
| `getOnlineUsers`   | server→client | `string[]` (user ids) | Broadcast online presence        |
| `newMessage`       | server→client | message object        | Deliver a message in real time   |

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

---

## License

This project is licensed under the ISC License.
