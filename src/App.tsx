import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./componants/Home/Home";
import Login from "./componants/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./componants/Common/NotFoundPage";
import SignUp from "./componants/Signup/Signup";
import Welcome from "./componants/Welcome/welocme";
import RequireAuth from "./componants/Common/RequiredAuth";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      element: <RequireAuth />,
      children: [
        {
          path: "/welcome",
          element: <Welcome />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
