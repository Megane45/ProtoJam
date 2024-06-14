import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CharacterDetails from "./components/CharacterDetails";

import Profile from "./components/Profile";
import Form from "./components/Form";

import CharacterList from "./components/CharacterList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CharacterList />,
  },
  {
    path: "/details/:id",
    element: <CharacterDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/form",
    element: <Form />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
