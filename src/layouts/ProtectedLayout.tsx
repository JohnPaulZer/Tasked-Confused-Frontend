import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // We try to fetch the user profile or a specific 'me' endpoint
        // If this succeeds, the http-only cookie is valid
        await axios.get("http://localhost:5000/api/tasks", { withCredentials: true });
        setIsAuth(true);
      } catch (error) {
        console.error("Not authenticated:", error);
        setIsAuth(false);
        navigate("/LandPage"); // Redirect to login if auth fails
      }
    };

    verifyToken();
  }, [navigate]);

  if (isAuth === null) {
    // Optional: Add a loading spinner here while checking auth
    return <div className="min-h-screen bg-primary flex items-center justify-center text-secondary">Loading...</div>;
  }

  return isAuth ? <Outlet /> : null;
};

export default ProtectedLayout;