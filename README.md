# To-Do List Application - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [Key Features](#key-features)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Authentication Flow](#authentication-flow)

---

## 🎯 Project Overview

**To-Do List** is a full-stack task management application built with:

- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB + JWT
- **Key Purpose:** Manage tasks with authentication, OTP verification, and password recovery

---

### Frontend Structure

```
frontend/src/
├── components/         # React components organized by feature
│   ├── common/         # Reusable: Button, Input, Checkbox, Modal, Header
│   ├── task/           # Task-related: TaskCard, AddTaskForm, MainPageTaskList
│   ├── auth/           # Auth forms: SignupForm, PasswordChangeSection
│   ├── modals/         # Modal components: SignupModals, ProfileModal, HistoryModal
│   └── profile/        # Profile: Profile, ProfileHeader, ProfileDetailsSection
├── pages/              # Full page components
│   ├── Home.tsx
│   ├── LandPage.tsx
│   ├── Signup.tsx
│   ├── MainPage.tsx
│   ├── AddTask.tsx
│   ├── EditTask.tsx
│   ├── CreateTask.tsx
│   ├── ForgotPass.tsx
│   ├── ResetPass.tsx
│   ├── VerifyCode.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
│   ├── usePasswordStrength.ts
│   └── useSignupValidation.ts
├── services/           # API services
│   └── api/            # API endpoints
├── axios/              # HTTP client configuration
├── types/              # TypeScript types
├── constants/          # Constants
├── utils/              # Utility functions
│   ├── validation/     # Validation logic
│   └── helpers/        # Helper functions (LegalModals)
├── layouts/            # Layout wrappers (ProtectedLayout)
├── animations/         # Animation files
├── assets/             # Images, fonts
├── App.tsx
├── main.tsx
└── index.css           # Global styles
```

---

## 🎨 Frontend Documentation

### Page Components

#### 1. **Home.tsx** - Welcome/landing page

- **Route:** `/home`
- **Purpose:** Initial page after signup, introduction to app
- **Components:** PrimaryButton, Logo
- **Navigation:** Links to main app or login

#### 2. **LandPage.tsx** - Login page

- **Route:** `/`
- **Features:** Email/password login form, remember me checkbox
- **Components:** CheckBox, InputField, PrimaryButton
- **Validation:** Email format, password required
- **API Call:** POST /api/auth/login

#### 3. **Signup.tsx** - User registration page

- **Route:** `/signup`
- **Features:** Name, email, password signup with validation
- **Components:** SignupForm, SignupHeader, SignupModals
- **Validation Hooks:** useSignupValidation, usePasswordStrength
- **Steps:** Form → API call → Success/Error modal → Redirect to login
- **API Call:** POST /api/auth/signup

#### 4. **MainPage.tsx** - Dashboard/home page

- **Route:** `/main` (Protected)
- **Purpose:** View all tasks, quick navigation
- **Components:** Header, DateSched, MainPageTaskHeader, MainPageTaskList, MainPageModals
- **Features:**
  - Display all user tasks
  - Filter by date
  - Complete/incomplete tasks
  - Quick add button
  - User menu (profile, logout)
- **API Call:** GET /api/tasks

#### 5. **AddTask.tsx** - Add/Schedule task page

- **Route:** `/addtask` (Protected)
- **Purpose:** Create new task with details
- **Components:** AddTaskHeader, AddTaskForm, AddTaskCalendar, AddTaskModal, ActCard
- **Features:**
  - Select category (icons for different categories)
  - Input title, description
  - Pick date and time
  - Confirmation before submit
- **API Call:** POST /api/tasks

#### 6. **EditTask.tsx** - Edit existing task

- **Route:** `/edittask/:id` (Protected)
- **Purpose:** Modify existing task
- **Similar to AddTask but:** Pre-fills task data and updates instead of creates
- **API Call:** PUT /api/tasks/:id

#### 7. **CreateTask.tsx** - Category selector

- **Route:** `/createtask` (Protected)
- **Purpose:** Choose task category before creating task
- **Category Options:** Work, Personal, Fitness, Meals, etc.
- **Navigation:** Redirects to AddTask with selected category

#### 8. **ForgotPass.tsx** - Password recovery start

- **Route:** `/forgot`
- **Purpose:** Initiate password reset
- **Steps:**
  1. Enter email
  2. Submit
  3. Success modal shown
  4. Redirect to verify code page
- **API Call:** POST /api/auth/forgot-password

#### 9. **VerifyCode.tsx** - OTP verification page

- **Route:** `/verify` (Receives email from state)
- **Purpose:** Verify 6-digit OTP sent to email
- **Features:**
  - 6 separate input fields for OTP digits
  - Auto-focus to next field on digit entry
  - Backspace to go to previous field
  - Resend OTP option
  - Countdown timer for resend
- **API Calls:**
  - POST /api/auth/verify-otp
  - POST /api/auth/forgot-password (resend)

#### 10. **ResetPass.tsx** - New password entry

- **Route:** `/reset` (Receives email from state)
- **Purpose:** Set new password after OTP verification
- **Features:** Password input with strength indicator
- **API Call:** POST /api/auth/reset-password

#### 11. **ProtectedLayout.tsx** - Authentication wrapper

- **Purpose:** Verify JWT token validity before showing protected routes
- **Process:**
  1. Check if user has valid JWT cookie
  2. Verify token by calling protected API endpoint
  3. Show loading state while checking
  4. Redirect to login if unauthorized
  5. Show protected routes if authorized

---

### Component Structure

#### Common Components (`components/common/`)

- **Header.tsx** - Top navigation with profile menu
- **PrimaryButton.tsx** - Main action button
- **InputField.tsx** - Text input component
- **CheckBox.tsx** - Checkbox input
- **Modal.tsx** - Generic modal component
- **BackButton.tsx** - Navigation back button
- **PageTransition.tsx** - Page animation wrapper
- **PasswordStrengthIndicator.tsx** - Shows password strength

#### Task Components (`components/task/`)

- **TaskCard.tsx** - Display single task with edit/delete
- **ActCard.tsx** - Activity/category card
- **AddTaskForm.tsx** - Task input form
- **AddTaskHeader.tsx** - Header section for add task page
- **AddTaskCalendar.tsx** - Calendar date picker
- **AddTaskModal.tsx** - Confirmation modal for new task
- **MainPageTaskList.tsx** - List of all tasks
- **MainPageTaskHeader.tsx** - Task section header
- **MainPageTopSection.tsx** - Top section with quick stats

#### Auth Components (`components/auth/`)

- **SignupForm.tsx** - Registration form
- **SignupHeader.tsx** - Signup page header
- **PasswordChangeSection.tsx** - Change password in profile

#### Modal Components (`components/modals/`)

- **SignupModals.tsx** - Success/error/terms/privacy modals for signup
- **ProfileModal.tsx** - Edit profile modal
- **HistoryModal.tsx** - View task history
- **MainPageModals.tsx** - Modals for main page
- **ConfirmationOverlay.tsx** - Generic confirmation dialog

#### Profile Components (`components/profile/`)

- **Profile.tsx** - Main profile page
- **ProfileHeader.tsx** - Profile header section
- **ProfileDetailsSection.tsx** - Edit profile details
- **ProfileModalFooter.tsx** - Modal actions footer

---

### Custom Hooks

#### `usePasswordStrength.ts`

- **Purpose:** Track password strength while typing
- **Returns:** { strength, score, feedback }
- **Levels:** Weak → Fair → Good → Strong → Very Strong

#### `useSignupValidation.ts`

- **Purpose:** Validate signup form data
- **Returns:** { errors, isValid, validateField }
- **Validates:**
  - Email format
  - Password strength
  - Password confirmation match
  - Name not empty

---

### Authentication Flow

#### Signup Flow

```
User enters details
  ↓
useSignupValidation (client validation)
  ↓
POST /api/auth/signup (backend validation)
  ↓
Hash password + Create user in MongoDB
  ↓
Generate JWT token
  ↓
Set HTTP-only cookie
  ↓
ShowModal success
  ↓
Redirect to /
```

#### Login Flow

```
User enters credentials
  ↓
POST /api/auth/login
  ↓
Verify credentials against hashed password
  ↓
Generate JWT token
  ↓
Set HTTP-only cookie
  ↓
Redirect to /main (protected route)
  ↓
ProtectedLayout verifies JWT
  ↓
Show MainPage
```

#### Forgot Password Flow

```
User clicks "Forgot Password"
  ↓
Enters email on ForgotPass.tsx
  ↓
POST /api/auth/forgot-password
  ↓
Backend generates 6-digit OTP
  ↓
Saves OTP to user document (expires in 15 min)
  ↓
Sends OTP via email
  ↓
Show success modal
  ↓
Redirect to /verify
  ↓
User enters OTP
  ↓
POST /api/auth/verify-otp
  ↓
OTP validated and cleared (prevent reuse)
  ↓
Redirect to /reset
  ↓
User enters new password
  ↓
POST /api/auth/reset-password
  ↓
Password hashed and updated
  ↓
Success modal
  ↓
Redirect to /
```

---

## ✨ Key Features

### Authentication

✅ User registration with email validation  
✅ Secure password hashing (bcryptjs)  
✅ JWT token-based authentication  
✅ HTTP-only cookies for token storage  
✅ "Remember Me" login option  
✅ Password strength indicator

### Password Recovery

✅ OTP-based password reset  
✅ Email verification via OTP  
✅ 15-minute OTP expiry  
✅ OTP reuse prevention  
✅ Resend OTP option

### Task Management

✅ Create tasks with category, date, time  
✅ Edit existing tasks  
✅ Delete tasks  
✅ Mark tasks complete/incomplete  
✅ View all user tasks sorted by date  
✅ Task filtering by date

### User Profile

✅ View personal information  
✅ Edit profile (name, email, mobile, gender, address)  
✅ Change password  
✅ User preferences

### Security

✅ Protected routes with JWT verification  
✅ Password hashing with salt rounds 10-12  
✅ CORS enabled  
✅ Rate limiting on authentication endpoints  
✅ HTTP-only cookies prevent XSS  
✅ User ownership verification on tasks

### User Experience

✅ Responsive design (mobile-friendly)  
✅ Form validation on client and server  
✅ Loading states and spinners  
✅ Success/error modals  
✅ Smooth page transitions  
✅ Password strength indicator  
✅ Calendar date picker

---

## 📡 API Endpoints

### Authentication Endpoints

```
POST /api/auth/signup              - Register new user
POST /api/auth/login               - Login user
POST /api/auth/logout              - Logout user
POST /api/auth/check-email         - Check if email exists
PUT  /api/auth/profile             - Update profile (Protected)
POST /api/auth/forgot-password     - Request password reset
POST /api/auth/verify-otp          - Verify OTP
POST /api/auth/reset-password      - Set new password
```

### Task Endpoints (All Protected)

```
POST   /api/tasks                  - Create new task
GET    /api/tasks                  - Get all user tasks
GET    /api/tasks/:id              - Get specific task
PUT    /api/tasks/:id              - Update task
DELETE /api/tasks/:id              - Delete task
```

---

## 🗄️ Database Schema

### Collections

#### Users Collection

- Stores user account information
- Password hashed with bcryptjs
- OTP fields for password recovery
- Timestamps for account creation

#### Tasks Collection

- Stores user tasks
- References user via `user` field
- Indexed by date for sorting
- Timestamps for creation/modification

---

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
npm install
npm run dev        # Start development server
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server
```

### Environment Variables Needed

- **Backend:** DATABASE_URL, JWT_SECRET, EMAIL credentials
- **Frontend:** VITE_API_URL (usually http://localhost:5000)

---

## 📝 Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire based on settings
- OTP valid for 15 minutes only
- Tasks permanently deleted cannot be recovered
- User can only see/modify their own tasks
- Rate limiting prevents brute force attacks
