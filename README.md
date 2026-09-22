# 🏛️ Kau-Shalmitra (कौशल-मित्र)
### Adaptive Competency Assessment & Capacity-Building Platform for Civil Services

> *"Skills ka Dost"* — A Smart India Hackathon initiative to transform government training from **One-Size-Fits-All** to **Targeted Capacity Building**.

![SIH](https://img.shields.io/badge/SIH-2026-blue) ![Problem](https://img.shields.io/badge/Problem%20Statement-SIH26101-orange) ![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green) ![Frontend](https://img.shields.io/badge/Frontend-React%2018-61dafb) ![Charts](https://img.shields.io/badge/Visuals-Recharts-red) ![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black)

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🖥️ **Frontend (Live)** | https://kau-shamitra.vercel.app |
| ⚙️ **Backend API (Live)** | https://kau-shalmitra.vercel.app |

### 🔑 Demo Credentials
| Portal | Login ID |
|--------|----------|
| 👤 Employee Portal | `EMP1001`, `EMP1002`, `EMP1003` |
| 🛡️ Admin / HR Portal | `ADMIN01` |

---

## 🎯 Problem Statement (SIH26101)

Government departments currently assign training programmes in a **generic, role-agnostic manner**. Officers waste time on irrelevant courses, while critical competency gaps go unnoticed. There is no unified system to:

1. **Assess** an officer's current competency against their role's required levels
2. **Measure** skill gaps across Behavioural, Functional, and Domain dimensions
3. **Recommend** the *right* government training course at the *right* time

**Kau-Shalmitra solves this** with an adaptive assessment engine integrated with the **iGOT Karmayogi ecosystem** and the **official NSSTA Advance Training Calendar (FY 2026-27)**.

---

## ✨ Key Features

### 👤 Employee Portal
- 🔐 **Mock iGOT SSO Login** — simulates the OAuth 2.0 Authorization Code Flow (NIC ePramaan / iGOT gateway)
- 📊 **Competency Radar Chart** — Current Level vs Required Level (Behavioural / Functional / Domain)
- 🎯 **Adaptive Assessment Engine** — question difficulty dynamically adjusts (Easy → Medium → Hard) based on live performance, just like CAT/GRE
- 💡 **Instant Feedback & Explanations** after every answer
- 📚 **Personalized Course Recommendations** mapped from the **real NSSTA FY 2026-27 training calendar** (venues, dates, durations)

### 🛡️ Admin / HR Portal
- 🔐 **Mock NIC ePramaan Login** with Role-Based Access Control
- 📈 **Departmental Skill-Gap Bar Chart** — average current vs required levels across the ministry
- 👥 **Employee Competency Table** — weakest skill & gap score per officer
- 📅 **Official NSSTA Training Calendar** — browse all FY 2026-27 batches with "Nominate Employees" action
- 🧠 **AI Insight Cards** — e.g., *"Data Analytics has the highest departmental gap → recommend bulk nomination for IIT Bombay batch"*

---

## 🧠 How the Adaptive Engine Works

```
Start (Medium, score 1200)
   ├── Correct Answer  → Difficulty UP   (score +200)
   └── Wrong Answer    → Difficulty DOWN (score -200)
...continues until 5 questions or confidence threshold...
Final Score → Skill Level (1–5) → Course Recommendation
```

---

## 🏛️ Real Government Dataset Integration

Unlike typical hackathon projects with dummy data, Kau-Shalmitra integrates the **official Advance Training Calendar of NSSTA (National Statistical Systems Training Academy, MoSPI) for FY 2026-27**.

**Sample Skill → Course Mapping:**

| Detected Skill Gap | Recommended Real Course | Dates | Venue |
|--------------------|------------------------|-------|-------|
| Data Analytics | Data-driven decision-making using data analytics | 13-07-2026 to 17-07-2026 | IIT Bombay / IIT Kanpur |
| File Noting & Drafting | Parliamentary Procedures, Cabinet Note Prep, Noting & Drafting, MOP | 14-12-2026 to 18-12-2026 | MCRHRDIT Hyderabad |
| Team Leadership | Team Building & Leadership through Adventure Sports (Trekking) | 21-09-2026 to 25-09-2026 | NIM Uttarkashi / JIM&WS J&K / HMI Darjeeling |
| AI & Machine Learning | Course on AI, AI-ready Data & Machine Readable Data | 03-08-2026 to 07-08-2026 | IIT Madras / IIT Delhi / IIT Kharagpur |
| Ethical Conduct | Ethics in Public Service | 22-02-2027 to 26-02-2027 | ICCG, Panchagani |
| Stress Management | Stress Management / Work Beyond Stress | 13-07-2026 to 17-07-2026 | Art of Living, Bengaluru |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Recharts, Axios |
| Backend | Node.js, Express.js, CORS |
| Data | In-memory mock iGOT database (`data.js`) + NSSTA FY 2026-27 catalog |
| Auth (Simulated) | OAuth 2.0 Authorization Code Flow (iGOT SSO / NIC ePramaan) |
| Deployment | Vercel (Serverless backend via `vercel.json` + CRA frontend) |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```
igot/
├── server.js              # Express API + Adaptive Assessment Engine
├── data.js                # Users, NSSTA Course Catalog, Question Bank
├── package.json           # Backend dependencies
├── vercel.json            # Serverless deployment config
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js                 # Central routing & state management
    │   ├── index.js
    │   ├── index.css              # Tailwind directives
    │   └── components/
    │       ├── LandingPage.jsx    # Dual-portal entry (Employee/Admin)
    │       ├── EmployeeLogin.jsx  # Mock iGOT SSO gateway
    │       ├── AdminLogin.jsx     # Mock NIC ePramaan gateway
    │       ├── Dashboard.jsx      # Radar chart, gaps, recommendations
    │       ├── Assessment.jsx     # Adaptive question flow
    │       ├── Results.jsx        # Score & skill-level report
    │       └── AdminDashboard.jsx # Dept analytics + NSSTA calendar
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v16+)
- npm

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
cd <YOUR_REPO>
```

### 2️⃣ Run the Backend (Terminal 1)
```bash
npm install
node server.js
# 🚀 Mock iGOT API running on http://localhost:5000
```

### 3️⃣ Run the Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
# ⚛️ React app running on http://localhost:3000
```

> **Note:** For local development, ensure API calls point to `http://localhost:5000`. For production, they point to the live Vercel backend URL.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/igot/profile/:userId` | Fetch officer competency profile |
| GET | `/api/igot/recommendations/:userId` | Get personalized NSSTA course recommendations |
| POST | `/api/assessment/start` | Start adaptive assessment session |
| POST | `/api/assessment/submit-answer` | Submit answer, get next adaptive question |
| POST | `/api/assessment/complete` | Finalize session & compute skill level |
| GET | `/api/admin/department-stats` | Department-wide average skill gaps |
| GET | `/api/admin/employees` | Employee competency list with weakest skills |
| GET | `/api/admin/training-calendar` | Full NSSTA FY 2026-27 calendar |

---

## 🔐 Security Architecture (Simulated)

- **No password storage** — authentication delegated to simulated **iGOT SSO / NIC ePramaan** gateways
- **OAuth 2.0 Authorization Code Flow**: Redirect → Auth Code → JWT Token Exchange → Profile Fetch
- **Role-Based Access Control (RBAC)**: Employee vs Admin portals with separate gateways
- **ID format validation** (`EMP*` / `GOV*` for officers, `ADM*` / `HR*` for admins)

---

## ☁️ Deployment Notes

- **Backend:** Deployed as a **Vercel serverless function** (`vercel.json` rewrites all routes to `server.js`; `module.exports = app` pattern with `require.main === module` guard for local/dev parity)
- **Frontend:** Vercel project with **Root Directory = `frontend`**, build command `CI=false npm run build`
- ⚠️ *Lesson learned:* Preview deployments enforce Vercel Authentication (401) — always use the **Production URL** for cross-origin API calls.

---

## 📸 Screenshots

*(Add your screenshots here — Landing Page, Employee Dashboard, Assessment, Results, Admin Dashboard)*

| Landing Page | Employee Dashboard |
|:---:|:---:|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) |

| Adaptive Assessment | Admin Analytics |
|:---:|:---:|
| ![Assessment](screenshots/assessment.png) | ![Admin](screenshots/admin.png) |

---

## 🔮 Future Scope

- 🤖 LLM-powered personalized feedback & question generation
- 📜 DigiLocker-verified certificate upload → auto skill-level upgrade
- 🗓️ Bulk nomination workflow with approval hierarchy (e-Office integration)
- 📱 Native mobile app via iGOT Karmayogi marketplace
- 🔗 Live integration with real iGOT Karmayogi APIs & NIC ePramaan

---

## 🙏 Acknowledgements

- **NSSTA, MoSPI** — Official Advance Training Calendar FY 2026-27
- **iGOT Karmayogi / Mission Karmayogi** — Capacity-building vision
- **DoPT** — IST programme framework
- **Smart India Hackathon 2026** — Platform for innovation

---

## 📄 License

This project is built for **Smart India Hackathon 2026** (Problem Statement SIH26101) and is open for evaluation purposes.

---

<div align="center">

### Made with ❤️ for a Skilled & Self-Reliant India
**Kau-Shalmitra — Assess. Adapt. Advance.**

</div>
