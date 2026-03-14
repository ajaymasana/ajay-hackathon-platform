# AJAY MASANA'S Hackathon & Internship Finder

A full-stack platform for students to discover hackathons and internship opportunities — built with Next.js, Express.js, and MongoDB.

---

## 📁 Project Structure

```
ajay-hackathon-platform/
├── frontend/                  # Next.js React App
│   ├── pages/
│   │   ├── index.js           # Homepage
│   │   ├── login.js           # Login page
│   │   ├── signup.js          # Signup page
│   │   ├── dashboard.js       # User dashboard
│   │   ├── hackathons/
│   │   │   ├── index.js       # Hackathons listing
│   │   │   └── [id].js        # Hackathon detail
│   │   ├── internships/
│   │   │   ├── index.js       # Internships listing
│   │   │   └── [id].js        # Internship detail
│   │   └── admin/
│   │       ├── index.js       # Admin panel
│   │       ├── add-hackathon.js
│   │       ├── add-internship.js
│   │       ├── edit-hackathon/[id].js
│   │       └── edit-internship/[id].js
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, Layout
│   │   ├── cards/             # HackathonCard, InternshipCard
│   │   └── ui/                # Shared UI (Spinner, EmptyState, etc.)
│   ├── context/               # AuthContext, ThemeContext
│   ├── lib/                   # Axios API client
│   └── styles/                # Global CSS + Tailwind
│
└── backend/                   # Express.js API
    ├── server.js
    ├── seed.js                # Sample data seeder
    ├── config/db.js
    ├── models/                # User, Hackathon, Internship
    ├── controllers/           # Auth, Hackathons, Internships, Users
    ├── routes/                # REST routes
    └── middleware/            # JWT auth middleware
```

---

## ⚡ Tech Stack

| Layer      | Technology                      |
|------------|----------------------------------|
| Frontend   | Next.js 14, React 18, Tailwind CSS, Framer Motion |
| Backend    | Node.js, Express.js              |
| Database   | MongoDB with Mongoose            |
| Auth       | JWT (JSON Web Tokens)            |
| HTTP       | Axios                            |
| Fonts      | Syne + JetBrains Mono (Google Fonts) |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (local install or MongoDB Atlas free cluster)
- npm or yarn

---

### Step 1 — Clone / Download the project

```bash
# If using git
git clone <repo-url>
cd ajay-hackathon-platform
```

---

### Step 2 — Setup the Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ajay-hackathon-platform
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

> **Using MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string.

#### Seed sample data (recommended)

```bash
node seed.js
```

This will:
- Insert 6 sample hackathons
- Insert 6 sample internships
- Create an admin user:
  - **Email:** `admin@ajaymasana.com`
  - **Password:** `admin123`

#### Start the backend server

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Backend runs at: **http://localhost:5000**

---

### Step 3 — Setup the Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Start the frontend

```bash
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## 🖥️ Pages & Features

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured hackathons & internships |
| `/hackathons` | Browse all hackathons with search & filters |
| `/hackathons/[id]` | Full hackathon detail + save button |
| `/internships` | Browse all internships with search & filters |
| `/internships/[id]` | Full internship detail + save button |
| `/login` | JWT login |
| `/signup` | Register new account |
| `/dashboard` | User dashboard — saved opportunities |
| `/admin` | Admin panel — manage all listings |
| `/admin/add-hackathon` | Add new hackathon (admin only) |
| `/admin/add-internship` | Add new internship (admin only) |
| `/admin/edit-hackathon/[id]` | Edit hackathon (admin only) |
| `/admin/edit-internship/[id]` | Edit internship (admin only) |

---

## 🔐 API Endpoints

### Auth
```
POST /api/auth/signup        Register new user
POST /api/auth/login         Login
GET  /api/auth/me            Get current user (protected)
```

### Hackathons
```
GET  /api/hackathons                 List all (with pagination + search)
GET  /api/hackathons/featured        Featured hackathons
GET  /api/hackathons/:id             Single hackathon
```

### Internships
```
GET  /api/internships                List all (with pagination + search)
GET  /api/internships/featured       Featured internships
GET  /api/internships/:id            Single internship
```

### Users (protected — requires JWT)
```
GET    /api/users/saved              Get saved opportunities
POST   /api/users/save               Save an opportunity
DELETE /api/users/save/:id           Unsave an opportunity
```

### Admin (protected — admin role required)
```
POST   /api/admin/hackathons         Create hackathon
PUT    /api/admin/hackathons/:id     Update hackathon
DELETE /api/admin/hackathons/:id     Delete hackathon

POST   /api/admin/internships        Create internship
PUT    /api/admin/internships/:id    Update internship
DELETE /api/admin/internships/:id    Delete internship
```

---

## 🎨 UI Features

- **Dark / Light mode toggle** — persisted to localStorage
- **Glassmorphism cards** — frosted glass effect with backdrop blur
- **Framer Motion animations** — page transitions, card hover effects, staggered reveals
- **Gradient hero section** — animated background with floating blobs
- **Syne font** — distinctive display typography
- **Responsive design** — mobile-first layout
- **Real-time search** — debounced search with filter tabs
- **Toast notifications** — success/error feedback

---

## 🛠️ Making yourself Admin

After signup, open MongoDB and update your user:

```js
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

Or use the seeded admin account: `admin@ajaymasana.com` / `admin123`

---

## 📦 Build for Production

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

---

Built with ❤️ by **Ajay Masana**
