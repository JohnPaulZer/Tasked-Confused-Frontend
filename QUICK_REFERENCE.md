# 🚀 Quick Start Guide & API Reference

## Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

**Runs on:** http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Runs on:** http://localhost:5173

---

## 🔌 API Endpoints Quick Reference

### Authentication (Base: /api/auth/)

| Method | Endpoint         | Auth Required | Purpose               |
| ------ | ---------------- | ------------- | --------------------- |
| POST   | /signup          | ❌ No         | Register new user     |
| POST   | /login           | ❌ No         | Login user            |
| POST   | /logout          | ❌ No         | Logout user           |
| POST   | /check-email     | ❌ No         | Check if email exists |
| POST   | /forgot-password | ❌ No         | Send OTP to email     |
| POST   | /verify-otp      | ❌ No         | Verify OTP code       |
| POST   | /reset-password  | ❌ No         | Set new password      |
| PUT    | /profile         | ✅ Yes        | Update profile        |

### Tasks (Base: /api/tasks/)

| Method | Endpoint | Auth Required | Purpose           |
| ------ | -------- | ------------- | ----------------- |
| POST   | /        | ✅ Yes        | Create task       |
| GET    | /        | ✅ Yes        | Get all tasks     |
| GET    | /:id     | ✅ Yes        | Get specific task |
| PUT    | /:id     | ✅ Yes        | Update task       |
| DELETE | /:id     | ✅ Yes        | Delete task       |

---

## 📊 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────┘

SIGNUP:
  User → SignupForm → ValidationHooks → POST /signup → JWT Created → Redirect Login

LOGIN:
  User → LoginForm → POST /login → JWT in Cookie → ProtectedLayout Check → Dashboard

FORGOT PASSWORD:
  ForgotPass → POST /forgot-password → OTP Generated → Email Sent → VerifyCode Page
               → POST /verify-otp → OTP Cleared → ResetPass Page
               → POST /reset-password → Password Updated → Success → Redirect Login

PROTECTED ROUTE:
  Any Private Page → ProtectedLayout Wrapper
                  → Check JWT in Cookie → Valid?
                  → Yes: Show Page | No: Redirect Login
```

---

## 🗂️ Key File Locations

### Backend Core Logic

- **Auth Logic:** `backend/src/controller/auth.ts`
- **Task Logic:** `backend/src/controller/taskCon.ts`
- **Database Models:** `backend/src/models/user.ts`, `backend/src/models/task.ts`
- **Routes:** `backend/src/routes/route.ts`, `backend/src/routes/taskRoute.ts`
- **Middleware:** `backend/src/middlewares/protectTask.ts` (JWT verification)

### Frontend Pages

- **Login:** `frontend/src/pages/LandPage.tsx`
- **Dashboard:** `frontend/src/pages/MainPage.tsx`
- **Add Task:** `frontend/src/pages/AddTask.tsx`
- **Password Recovery:** `frontend/src/pages/ForgotPass.tsx` → `VerifyCode.tsx` → `ResetPass.tsx`

### Frontend Components

- **Common UI:** `frontend/src/components/common/` (Button, Input, Modal, etc.)
- **Task Features:** `frontend/src/components/task/` (TaskCard, AddTaskForm, etc.)

---

## 🔐 Security Key Points

✅ **Passwords:** Hashed with bcrypt (salt rounds: 10-12)  
✅ **JWT Tokens:** Stored in HTTP-only cookies  
✅ **Protected Routes:** Verified by ProtectedLayout wrapper  
✅ **Task Ownership:** Users can only access their own tasks  
✅ **OTP Security:** 15-min expiry, auto-cleared after use  
✅ **Password Change:** Requires current password verification

---

## 📝 Request/Response Examples

### Create Task

```bash
POST /api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Complete project",
  "time": "14:30",
  "description": "Finish the React frontend",
  "category": "Work",
  "date": "2024-02-20"
}

Response (201):
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "user": "507f1f77bcf86cd799439010",
    "isCompleted": false,
    ...
  }
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439010",
    "name": "John Doe",
    "email": "user@example.com",
    ...
  }
}
```

### Forgot Password

```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response (200):
{
  "message": "OTP sent successfully"
}
```

### Verify OTP

```bash
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}

Response (200):
{
  "message": "OTP verified successfully"
}
```

### Reset Password

```bash
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "newPassword": "newPassword123"
}

Response (200):
{
  "message": "Password reset successfully"
}
```

---

## 🐛 Common Issues & Solutions

### Issue: 400 Bad Request on verify-otp

**Cause:** OTP doesn't match or expired (valid for 15 mins only)  
**Solution:** Get OTP from email or use forgot-password to resend

### Issue: 401 Unauthorized on protected routes

**Cause:** JWT token missing or expired  
**Solution:** Login again to get new token

### Issue: Task not found (404)

**Cause:** User trying to access someone else's task  
**Solution:** Each user can only see their own tasks

### Issue: Email already exists (400)

**Cause:** Trying to signup with existing email  
**Solution:** Login instead or use forgot password to recover account

---

## 🧪 Testing the App

### 1. Create Account

- Go to `/signup`
- Enter name, email, password
- Submit

### 2. Login

- Go to `/` (LandPage)
- Enter email and password
- Click Login

### 3. Create Task

- Click "Add Task" on MainPage
- Select category
- Fill in details
- Set date/time
- Confirm

### 4. Test Password Recovery

- Click "Forgot Password" on login
- Enter email
- Check console/email for OTP
- Enter OTP
- Set new password

---

## 📱 Folder Organization

All files are organized by **feature/function** for easy navigation:

- Components grouped: `common/`, `task/`, `auth/`, `modals/`, `profile/`
- Controllers separated: `auth.ts`, `taskCon.ts`
- Routes organized: `route.ts`, `taskRoute.ts`
- Utils structured: `error/`, helper functions

See **README.md** for complete documentation.
