import React from "react";
import "./style.scss";
import App from "./components/App";
import {
  createBrowserRouter,
  RouteProvider,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import routes from "./routes";

const router = createBrowserRouter(routes);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
