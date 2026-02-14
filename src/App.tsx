import { createBrowserRouter, RouterProvider } from "react-router";
import forgot from "./pages/ForgotPass";
import Home from "./pages/Home";
import LandPage from "./pages/LandPage";
import NotFound from "./pages/NotFound";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/Signup";
import verify from "./pages/VerifyCode";
import MainPage from "./pages/MainPage";
import CreateTask from "./pages/CreateTask";
import AddTask from "./pages/AddTask";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      Component: Home,
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
    {
      path: "/LandPage",
      Component: LandPage,
    },
    {
      path: "*",
      Component: NotFound,
    },
    {
      path: "/MainPage",
      Component: MainPage,
    },
    {
      path: "/CreateTask",
      Component: CreateTask,
    },
    {
      path: "/AddTask",
      Component: AddTask,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
