import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./ErrorPage.jsx";
import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
