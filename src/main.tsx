import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MainContextWrapper from "./context/MainContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainContextWrapper>
      <App />
    </MainContextWrapper>
  </React.StrictMode>
);
