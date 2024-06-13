import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CharacterDetails from "./components/CharacterDetails";

import CharacterList from "./components/CharacterList";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/",
    element: <CharacterList />,
  },
  {
    path: "/details/:id",
    element: <CharacterDetails />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
