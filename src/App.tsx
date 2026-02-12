import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";  
import forgot from "./pages/ForgotPass";
import verify from "./pages/VerifyCode";
import ResetPass from "./pages/ResetPass";
import LandPage from "./pages/LandPage";

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
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
