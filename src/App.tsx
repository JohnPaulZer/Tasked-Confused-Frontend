import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageTransition from "./components/common/PageTransition";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AddTask from "./pages/AddTask";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Forgot from "./pages/ForgotPass";
import Home from "./pages/Home";
import LandPage from "./pages/LandPage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/Signup";
import Verify from "./pages/VerifyCode";

// Root router with public and protected routes (see README.md for details)
function App() {
  const router = createBrowserRouter([
    // Public Routes - Login, Signup, Password Recovery
    {
      path: "/",
      element: (
        <PageTransition>
          <LandPage />
        </PageTransition>
      ),
    },

    {
      path: "/LandPage",
      element: (
        <PageTransition>
          <LandPage />
        </PageTransition>
      ),
    },

    {
      path: "/signup",
      element: (
        <PageTransition>
          <Signup />
        </PageTransition>
      ),
    },

    /**
     * Forgot password page
     * Password recovery with email verification
     */
    {
      path: "/forgot",
      element: (
        <PageTransition>
          <Forgot />
        </PageTransition>
      ),
    },

    /**
     * OTP Verification page
     * Verify OTP sent to email during password reset
     */
    {
      path: "/verify",
      element: (
        <PageTransition>
          <Verify />
        </PageTransition>
      ),
    },

    /**
     * Password Reset page
     * Set new password after OTP verification
     */
    {
      path: "/reset",
      element: (
        <PageTransition>
          <ResetPass />
        </PageTransition>
      ),
    },

    // ==============================
    // 🔒 PROTECTED ROUTES (Login Required)
    // All routes wrapped in ProtectedLayout middleware
    // Middleware: Validates JWT token and redirects to LandPage if unauthorized
    // ==============================
    {
      element: <ProtectedLayout />,
      children: [
        /**
         * Dashboard/Main page
         * Path: /MainPage
         * Shows all tasks, task stats, date filtering, and quick actions
         * Features: Create, edit, delete, mark complete tasks
         */
        {
          path: "/MainPage",
          element: (
            <PageTransition>
              <MainPage />
            </PageTransition>
          ),
        },

        /**
         * Home page variant
         * Path: /home
         * Similar to MainPage (flexible routing)
         */
        {
          path: "/home",
          element: (
            <PageTransition>
              <Home />
            </PageTransition>
          ),
        },

        /**
         * Create new task page
         * Path: /CreateTask
         * Form to create task with: title, description, date, time, category
         * Redirects to MainPage on success
         */
        {
          path: "/CreateTask",
          element: (
            <PageTransition>
              <CreateTask />
            </PageTransition>
          ),
        },

        /**
         * Add task variant page
         * Path: /AddTask
         * Alternative create task interface
         */
        {
          path: "/AddTask",
          element: (
            <PageTransition>
              <AddTask />
            </PageTransition>
          ),
        },

        /**
         * Edit existing task page
         * Path: /EditTask/:id
         * Params: id - MongoDB task ID
         * Prefills form with current task data
         * Redirects to MainPage on success
         */
        {
          path: "/EditTask/:id",
          element: (
            <PageTransition>
              <EditTask />
            </PageTransition>
          ),
        },
      ],
    },

    // ==============================
    // ❌ 404 - Not Found Route
    // ==============================
    /**
     * Catch-all route for invalid/non-existent paths
     * Displays user-friendly 404 page
     */
    {
      path: "*",
      element: (
        <PageTransition>
          <NotFound />
        </PageTransition>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
