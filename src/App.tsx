import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Updated to 'react-router-dom'
import AddTask from "./pages/AddTask";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import forgot from "./pages/ForgotPass";
import Home from "./pages/Home";
import LandPage from "./pages/LandPage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/Signup";
import verify from "./pages/VerifyCode";
import ProtectedLayout from "./layouts/ProtectedLayout"; 

function App() {
  const router = createBrowserRouter([
    // ==============================
    // 🌍 PUBLIC ROUTES (No Login Required)
    // ==============================
    {
      path: "/",
      Component: LandPage, // Default to Login Page
    },
    {
      path: "/LandPage",
      Component: LandPage,
    },
    {
      path: "/signup",
      Component: Signup,
    },
    {
      path: "/forgot",
      Component: forgot,
    },
    {
      path: "/verify",
      Component: verify,
    },
    {
      path: "/reset",
      Component: ResetPass,
    },

    // 🔒 PROTECTED ROUTES (Login Required)
    {
      element: <ProtectedLayout />, 
      children: [
        {
          path: "/MainPage",
          Component: MainPage,
        },
        {
          path: "/home",
          Component: Home,
        },
        {
          path: "/CreateTask",
          Component: CreateTask,
        },
        {
          path: "/AddTask",
          Component: AddTask,
        },
        {
          path: "/EditTask/:id",
          Component: EditTask,
        },
      ],
    },

    {
      path: "*",
      Component: NotFound,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;