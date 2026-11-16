import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);
