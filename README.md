# 🥗 FoodBridge – Bridging Hunger with Technology

## 🚀 Overview

FoodBridge is a full-stack web application designed to seamlessly connect **food donors** (like restaurants or individuals) with **receivers** (NGOs or community kitchens). It helps reduce food waste and direct surplus food to those who need it most. The platform also includes a lightweight AI-based verification module to assess trustworthiness of new users.

---

## 🌟 Project Objective

* **Reduce food waste** by making excess food donations easy and traceable.
* **Support NGOs/receivers** in accessing surplus food for distribution.
* **Build a transparent, easy-to-use system** that allows trust and safety for both donors and receivers.
* **Introduce smart verification** of receiver organizations using AI to minimize misuse.

> ⚠️ Note: For demo purposes, the **AI verification criteria is intentionally kept very lenient** so that everyone can sign up and try the website freely.

---

## ✅ Features Implemented

### 👤 Authentication

* Email/password sign-up and login using Supabase Auth
* Role-based access: **Donor** and **Receiver**
* ✅ Google Authentication has been **intentionally removed** to streamline authentication and simplify deployment

### 🍱 Donor Functionality

* Post food listings with description, location, expiry, etc.
* View and manage listings
* See requests from receivers
* Delete listings and automatically clean up related requests

### 📦 Receiver Functionality

* View available food listings
* Request food items or submit custom requests
* Cancel submitted requests

### 🧠 AI Verification

* During sign-up, receivers are verified via an AI backend that evaluates organizational trust based on input like org name, description, and document URL.
* Python FastAPI backend routes `/register_user_with_ai` and AI modules like `verify_user_trust.py` perform the check

---

## 🛠️ Tech Stack

### ⚙️ Frontend

* **Next.js** – React-based full-stack framework with routing, server-side rendering, and API routes
* **Tailwind CSS** – for rapid UI development
* **Vercel** – (optional) for deployment

### 🧹 Backend

* **FastAPI (Python)** – REST API for AI-based verification logic
* **Supabase** – as Backend-as-a-Service:

  * PostgreSQL database
  * Supabase Auth (email/password)
  * Storage and edge functions (optional)

### 🧠 AI Verification

* Custom ML logic in `verify_user_trust.py` and `custom_requests.py`
* Simple trustworthiness scoring (expandable to LLM/GPT-based logic)

---

## 📁 Project Structure

```
FS-FOODBRIDGE/
├── backend/
│   ├── ai/
│   │   ├── verify_user_trust.py
│   │   └── custom_requests.py
│   └── main.py (FastAPI server)
│
├── frontend/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── donor/DonorDashboard.js
│   │   └── receiver/ReceiverDashboard.js
│   ├── utils/supabaseClient.js
│   ├── .env.local
│   └── ...
├── README.md
└── .gitignore
```

---

## ⚙️ How to Set Up Locally

### ✅ Prerequisites

* Node.js (v18+)
* Python 3.8+
* Supabase account
* Git

### 🔻 Clone the repo

```bash
git clone https://github.com/Ishaan2605/FoodBridge.git
cd FoodBridge
```

### 📆 Install frontend dependencies

```bash
cd frontend
npm install
```

### 🔑 Setup `.env.local` in `backend/`

### 🐍 Run Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### ▶️ Run Frontend

```bash
cd frontend
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Supabase Configuration Notes

* Ensure your `Users`, `food_listings`, `requests`, and `custom_requests` tables are created.
* RLS (Row-Level Security) should be configured properly.
* Make sure your Supabase Auth is enabled for email/password.

> Google Auth **has been removed**. You only need email/password login now.

---

## 🧠 AI Logic Overview

* Signup hits backend route `/register_user_with_ai`
* Backend verifies trust via scoring logic in `verify_user_trust.py`
* If trust score passes threshold, user is registered in Supabase

This adds a safety layer to block unverified or fake receiver accounts.

---

## 🌍 Deployment Suggestions

* **Frontend**: Use [Vercel](https://vercel.com/) for deploying the Next.js app
* **Backend**: Use [Render](https://render.com/) or deploy via a Python-compatible server (e.g. EC2, Railway)
* **Supabase**: Hosted automatically on supabase.io

---

## 🤝 Acknowledgments

* Developed as part of the FS Project 2025 initiative
* AI logic custom-built without GPT dependency for privacy
* Thanks to open-source tools: FastAPI, Supabase, Next.js, TailwindCSS

---

## 📢 Contact

Created by **Ishaan Deshpande**
Email: [ishaande26@gmail.com](mailto:ishaande26@gmail.com)
GitHub: [github.com/Ishaan2605](https://github.com/Ishaan2605)

>  **Feel free to reach out for any help, questions, or just a quick chat!**

---
