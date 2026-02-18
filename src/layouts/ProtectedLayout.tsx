import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * PROTECTED LAYOUT - Authentication Wrapper
 *
 * This layout component protects routes that require authentication.
 * It acts as a middleware wrapper for all protected routes.
 *
 * Features:
 * - Verifies JWT token validity on mount
 * - Prevents unauthorized users from accessing protected pages
 * - Shows loading state while checking authentication
 * - Redirects to login page if session is invalid/expired
 *
 * How it Works:
 * 1. On component mount, sends request to protected API endpoint
 * 2. If request succeeds: User is authenticated, render child routes (Outlet)
 * 3. If request fails (401): User is not authenticated, redirect to login
 * 4. While checking: Shows loading message
 *
 * Hierarchy:
 * - App (Router)
 *   └── ProtectedLayout (This component)
 *       └── MainPage, CreateTask, EditTask, etc. (Child routes)
 */
const ProtectedLayout = () => {
  const navigate = useNavigate();

  /**
   * Authentication state:
   * - null: Still checking auth status
   * - true: User is authenticated
   * - false: User is NOT authenticated
   */
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  /**
   * VERIFY TOKEN EFFECT
   * Runs once on component mount to verify JWT token validity
   *
   * Process:
   * 1. Make API request to protected endpoint (with credentials/cookies)
   * 2. If successful: JWT token is valid, set isAuth = true
   * 3. If 401 error: JWT is invalid/expired, set isAuth = false and redirect
   * 4. Uses /api/tasks endpoint as auth check since it requires JWT
   */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Make request to any protected route (uses HTTP-only cookie)
        // If this succeeds, the JWT token is valid
        await axios.get("http://localhost:5000/api/tasks", {
          withCredentials: true,
        });
        setIsAuth(true); // Token is valid
      } catch (error) {
        console.error("Not authenticated:", error);
        setIsAuth(false); // No valid token found
        navigate("/LandPage"); // Redirect to login
      }
    };

    verifyToken();
  }, [navigate]);

  /**
   * RENDER LOGIC
   *
   * 1. While checking (isAuth === null): Show loading message
   * 2. If authenticated (isAuth === true): Render child routes with <Outlet />
   * 3. If not authenticated (isAuth === false): Render nothing (already redirected)
   */
  if (isAuth === null) {
    // Show loading state while verifying authentication
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-secondary">
        Loading...
      </div>
    );
  }

  // Render child routes only if authenticated
  return isAuth ? <Outlet /> : null;
};

export default ProtectedLayout;
