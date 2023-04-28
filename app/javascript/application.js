// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);

document.addEventListener("DOMContentLoaded", () => {
  // このDOMContentLoadedというイベントが発生したときにレンダリングされる
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
