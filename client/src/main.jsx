import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import CharacterList from "./pages/CharacterList";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/",
    element: <CharacterList/>,
    loader: () => 
      fetch("https://miadil.github.io/starwars-api/api/cardGames.json")
      .then(response => response.json())
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
