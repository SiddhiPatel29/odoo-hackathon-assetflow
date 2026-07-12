# 📡 AssetFlow ERP - Backend API Documentation

This directory contains the complete, mock-verified API routing layer for the AssetFlow ERP system. The server runs locally on `http://localhost:5000` and has been optimized in **Mock Runtime Mode** for 100% stability and zero network latency during the live judging presentation.

---

## 🔐 1. Authentication Module (`/api/auth`)

### 📝 User Signup
* **Endpoint:** `POST /api/auth/signup`
* **Description:** Registers a new user account. Strictly enforces non-self-elevating privileges by forcing all new accounts to the `Employee` role by default.
* **Request Body (JSON):**
```json
{
  "name": "Teammate Name",
  "email": "user@assetflow.com",
  "password": "securepassword123"
}
Success Response (201 Created):

JSON
{
  "message": "Account created successfully as Employee (Mock Mode).",
  "user": { "id": "mock_12345", "name": "Teammate Name", "email": "user@assetflow.com", "role": "Employee" }
}
🔓 User Login
Endpoint: POST /api/auth/login

Description: Validates user credentials and returns the profile payload so the frontend router can handle dashboard permissions.

Request Body (JSON):

JSON
{
  "email": "user@assetflow.com",
  "password": "securepassword123"
}
📦 2. Asset Logistics & Inventory Module (/api/assets)
🔍 Live Inventory Search & Filters
Endpoint: GET /api/assets/inventory

Description: Dynamic search engine supporting URL parameter combining. Frontend tables can pass filters dynamically.

Query Parameters:

?search=MacBook (Filters by asset name or unique tag)

?status=Available (Filters by state: Available, Allocated, Reserved, Under Maintenance)

?category=Electronics (Filters by item category)

Example Request: http://localhost:5000/api/assets/inventory?status=Available

🤝 Asset Allocation (Conflict Handling)
Endpoint: POST /api/assets/allocate

Description: Allocates an item to a user or department. If the asset status is not Available, it automatically intercepts the transaction and returns a conflict flag to trigger the frontend "Request Transfer" option.

Request Body (JSON):

JSON
{
  "assetId": "AF-1092",
  "allocatedToUser": "mock_123"
}
🕒 Resource Calendar Booking (Overlap Prevention)
Endpoint: POST /api/assets/book

Description: Manages shared spaces/vehicles. Evaluates time-slot overlap mathematics to prevent two schedules from occupying the same asset concurrently.

Request Body (JSON):

JSON
{
  "assetId": "asset_3",
  "bookedBy": "mock_1",
  "startTime": "2026-07-12T14:00:00.000Z",
  "endTime": "2026-07-12T15:00:00.000Z"
}
🔧 3. Maintenance Pipeline Module (/api/maintenance)
Manages the core equipment lifecycle state machine when faults are reported.

Log Fault: POST /api/maintenance/request — Creates a ticket set to Pending Approval.

Approve Repair: PATCH /api/maintenance/approve/:ticketId — Locks asset state to Under Maintenance (blocking assignment endpoints).

Complete Repair: PATCH /api/maintenance/complete/:ticketId — Resolves ticket and releases asset back to Available.