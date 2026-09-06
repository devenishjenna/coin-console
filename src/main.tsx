import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // TODO: this is currently empty
import App from "./App.tsx";

// attching app to DOM node
// root will never be null
createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);