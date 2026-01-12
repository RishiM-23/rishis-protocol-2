# ❖ Rishi's Protocol

> A high-performance, cross-device productivity dashboard designed for Academic & DSA mastery.

![Project Status](https://img.shields.io/badge/status-active-emerald?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Tech Stack](https://img.shields.io/badge/stack-MERN-indigo?style=flat-square)

## 📖 Overview

**Rishi's Protocol** is a bespoke Progressive Web Application (PWA) built to manage the rigorous daily schedule of a Computer Science student. It solves the problem of friction between devices by providing a seamless, cloud-synced interface that works identically on a laptop and a smartphone.

Unlike generic to-do apps, this system is hard-coded with specific "Protocols" (daily routines) optimized for high-value output (DSA, Academics, Health), featuring gamification elements like heatmaps and audio feedback to enforce consistency.

## ✨ Key Features

* **☁️ Seamless Cloud Sync:** Instant synchronization between desktop and mobile via MongoDB Atlas.
* **📱 Cross-Device Experience:** Fully responsive UI that behaves like a native app on iOS/Android.
* **🛡️ Secure Access:** PIN-protected lock screen to prevent unauthorized access.
* **⚡ Optimistic UI:** Instant visual feedback (confetti, sounds) with background data consistency.
* **📊 Analytics Dashboard:** GitHub-style contribution heatmap and daily "Battle Logs" to track productivity streaks.
* **🧘 Focus Mode:** Distraction-free view that highlights only the current active objective.
* **📅 Dynamic Scheduling:** Automatically switches routines based on the day of the week (Short days, Long days, Weekends).

## 🛠️ Tech Stack

* **Frontend:** React.js (via CDN for lightweight architecture), Tailwind CSS
* **Backend:** Node.js (Serverless Functions)
* **Database:** MongoDB Atlas (Cloud Document Store)
* **Deployment:** Vercel (CI/CD Pipeline)

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* A MongoDB Atlas Account

### Local Development

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/rishis-protocol.git](https://github.com/your-username/rishis-protocol.git)
    cd rishis-protocol
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/
    ```

4.  **Run Locally**
    * To test the frontend, open `index.html` with a Live Server.
    * To test the backend, use `vercel dev` (requires Vercel CLI).

## 📦 Deployment

This project is optimized for **Vercel**.

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add the `MONGODB_URI` environment variable in Vercel Settings.
4.  Deploy.

## 📂 Project Structure

```text
/rishis-protocol
├── /api
│   └── sync.js       # Serverless function for DB operations (CRUD)
├── index.html        # Main React Application (SPA)
├── package.json      # Project metadata and dependencies
└── README.md         # Project documentation
