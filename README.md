# 🚖 Ride Management System — Frontend (React + Redux Toolkit + RTK Query)

> **Production-grade** frontend for a Ride Booking Platform (Rider / Driver / Admin)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Demo & Repos](#live-demo--repos)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Available Scripts](#available-scripts)
5. [Architecture & Patterns](#architecture--patterns)
6. [Features (by role)](#features-by-role)
7. [UI / UX Requirements & Accessibility](#ui--ux-requirements--accessibility)
8. [Emergency (SOS) Flow](#emergency-sos-flow)
9. [Data & State Management](#data--state-management)
10. [API Integration (RTK Query)](#api-integration-rtk-query)
11. [Testing & Quality](#testing--quality)
12. [Deployment](#deployment)
13. [Submission Checklist (for evaluators)](#submission-checklist-for-evaluators)
14. [Demo Credentials](#demo-credentials)
15. [Contributing](#contributing)
16. [License & Contact](#license--contact)

---

## Project Overview

This repository contains the **frontend** implementation for the Ride Management System — a responsive, role-based web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit (RTK Query)**. The UI communicates with a separate backend API (Node/Express + MongoDB) to provide features for **Riders**, **Drivers**, and **Admins**.

Key goals:
- Clear separation of concerns: components, hooks, services, and feature slices.
- Production-ready: routing, auth, role gating, lazy-loading, code-splitting, and accessibility considerations.
- Robust error handling and form validation.

---

## Live Demo & Repos

- **Frontend Repo:** [ridenest-client](https://github.com/simantabarua/ridenest-client)
- **Backend Repo:** [RideNest-api](https://github.com/simantabarua/RideNest-api)
- **Live Frontend (Firebase):** [ridenest-dev.web.app](https://ridenest-dev.web.app)
- **Live Frontend (Vercel):** [ridenest-two.vercel.app](https://ridenest-two.vercel.app/)
- **Live Backend (deployed):** `https://api.example.com` (update with actual backend URL)

---

## Tech Stack

- **Framework:** React + React Router
- **State & Data:** Redux Toolkit, RTK Query
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms & Validation:** React Hook Form + Zod
- **Maps (optional):** Leaflet / Google Maps
- **Charts (optional):** recharts
- **Notifications:** react-hot-toast
- **Auth:** JWT + Secure Role-based Guards
- **Testing:** Jest + React Testing Library

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Backend API running (see backend repo)

### Installation

```bash
# clone
git clone https://github.com/simantabarua/ridenest-client.git
cd ridenest-client

# install
npm install
```

### Environment Variables

Create a `.env.local` file with:

```
VITE_API_BASE_URL=https://api.example.com
VITE_GOOGLE_MAPS_API_KEY=your_map_key_here
VITE_APP_ENV=development
```

---

## Demo Credentials

Use the following seeded accounts for testing:

- **Super Admin** — super@mail.com / Super@123
- **Admin** — admin@mail.com / Admin@123
- **Driver** — driver@mail.com / Driver@123
- **Rider** — rider@mail.com / Rider@123

---

## License & Contact

MIT © Simanta Barua

📧 simanta.barua1@gmail.com  
🌐 [Portfolio](https://simanta.web.app/)  
💼 [LinkedIn](https://www.linkedin.com/in/simantabarua/)  
👨‍💻 [GitHub](https://github.com/simantabarua)  
