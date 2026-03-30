import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Login/Login";
import App from "./App/App";
import Credit from "./Credit/Credit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register/Register";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/main", element: <App /> },
  { path: "/credit", element: <Credit /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
