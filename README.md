# AssetFlow 🚀

AssetFlow is a modern, full-stack asset management and tracking system built during the Odoo Hackathon. It streamlines how organizations monitor physical equipment, handle allocations, manage employee bookings, and oversee hardware maintenance lifecycles through a clean, unified dashboard running entirely in an optimized client-side mock mode for rapid demonstration.

## 🌟 Key Features

* **User Authentication & Roles**: Secure login and registration system layout separating standard employees from system administrators.
* **Asset Tracking & Management**: Comprehensive CRUD views to register, update, and categorize physical organizational equipment.
* **Dynamic Booking System**: Allows employees to check equipment availability and place reservation requests via interactive modals.
* **Allocation Control**: Admin dashboard functionality to oversee, approve, and assign assets directly to specific team members.
* **Maintenance Lifecycles**: Dedicated ticket logging pipeline to transition broken or servicing gear out of active deployment arrays.

---

## 🏗️ Architecture & Tech Stack

The application is built using a modern decoupled layout:

* **Frontend**: React.js (Vite compiler), React Router, Tailwind CSS, and Axios.
* **Mock Engine**: Simulated data store configured for client-side state stability during evaluation runtime.
* **Deployment Platform**: Optimized for single-click static hosting on Vercel.

---

## 📦 Repository Structure

```text
odoo-hackathon-assetflow/
├── backend/               # Express.js Server API Layer
│   ├── models/            # Data Schemas (User, Asset, Booking, Allocation)
│   ├── routes/            # API Endpoints (Auth, Assets, Admin, Maintenance)
│   └── server.js          # Core Server Entrypoint & Middleware Configuration
├── frontend/              # React/Vite Client Application
│   ├── src/
│   │   ├── assets/        # Visual components and SVGs
│   │   ├── components/    # Reusable UI elements (Modals, Badges)
│   │   ├── App.jsx        # Routing and Primary Application Shell
│   │   └── main.jsx       # Client Entrypoint
│   └── vite.config.js     # Dev Server & Reverse-Proxy Routing Config
├── vercel.json            # Vercel Deployment Configuration Routing
└── package.json           # Root Project Configuration Settings

🛠️ Local Development Installation
Prerequisites
Make sure you have Node.js installed on your machine.

1. Clone the Repository
Bash
git clone [https://github.com/SiddhiPatel29/odoo-hackathon-assetflow.git](https://github.com/SiddhiPatel29/odoo-hackathon-assetflow.git)
cd odoo-hackathon-assetflow

2. Frontend Configuration
Navigate to the frontend directory and install the required node packages:

Bash
cd frontend
npm install

3. Launching the App Locally
To run the local development server:

Bash
npm run dev
Vite will compile your UI layout and expose the dashboard on http://localhost:3000.

🚀 Live Cloud Deployment Setup
This project is fully optimized to be deployed instantly on Vercel straight from GitHub:

Import this repository into your Vercel Dashboard.
Set the Root Directory setting to frontend.
Select Vite as the Framework Preset.

Under Environment Variables, configure the deployment flag to enable the simulated standalone workflow engine:
Key: VITE_USE_MOCK
Value: true

Click Deploy to generate your public production URL!
