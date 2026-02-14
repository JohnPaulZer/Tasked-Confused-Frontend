import "@fontsource/bree-serif/400.css";
import "@fontsource/inter/400.css"; // Defaults to weight 400
import "@fontsource/inter/700.css"; // Optional: Add bold weight if needed
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
