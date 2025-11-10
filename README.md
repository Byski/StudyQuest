
# StudyQuest: Gamified Study Planner
> **Level up your learning.** A gamified study planner with animated UI, course enrollment, assignment tracking, calendar quests, and ICS export.

---

## Live Demo  
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://studyquest-planner.vercel.app)  
[![Backend](https://img.shields.io/badge/Render-Backend-blue?style=for-the-badge&logo=render)](https://studyquest-api.onrender.com)

---

## Features

| Feature | Description |
|-------|-----------|
| **Game-Themed UI** | Animated landing page with floating books, GSAP transitions, and "Start Quest" button |
| **User Auth** | Secure register/login/logout with JWT + bcrypt |
| **Course Management** | Admins create courses; users enroll/unenroll |
| **Assignments** | Create, filter, update status (todo/doing/done), set priority & hours |
| **Quest Calendar** | Monthly view with assignment markers |
| **Analytics** | Estimated vs actual hours, priority sorting |
| **ICS Export** | Download future assignments as `.ics` file |
| **Gamification** | Level progress bar, badges, XP on completion |

---

## Tech Stack

| Layer | Technology |
|------|------------|
| **Frontend** | React, React Router, GSAP, React Calendar, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | SQLite (with foreign keys) |
| **Auth** | JWT + bcrypt |
| **Testing** | Jest + Supertest (TDD) |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Version Control** | Git + GitHub (branch-per-story, PRs) |

---

## Project Structure
studyquest-planner/
├── backend/
│   ├── db.js              # SQLite schema + init
│   ├── server.js          # Express API entrypoint
│   ├── routes/            # All backend API route modules
│   └── tests/             # Backend integration/unit tests
├── frontend/
│   └── src/
│       ├── pages/         # Page-level views (React)
│       ├── components/    # Reusable UI building blocks
│       └── App.js         # App root
├── docs/
│   └── REFACTOR.md        # Internal refactor log + clean code notes
├── studyquest.db          # SQLite local database file
├── README.md
└── package.json



---

## Setup & Run Locally

### Prerequisites
- Node.js ≥ 18
- Git
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/studyquest-planner.git
cd studyquest-planner
