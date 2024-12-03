import React from "react";
import { useRoutes } from "react-router-dom";
import { PATH } from "./path";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import LoginPage from "./../modules/auth/Login/LoginPage";
import RegisterPage from "./../modules/auth/register/RegisterPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "./../modules/home/HomePage/HomePage";
import MovieDetail from "../modules/home/MovieDetail/MovieDetail"; 

export default function useRouteElement() {
  const elements = useRoutes([
    {
      path: PATH.AUTH,
      element: <AuthLayout />,
      children: [
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: PATH.REGISTER,
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "movie/:id", 
          element: <MovieDetail />,
        },
      ],
    },
  ]);
  return elements;
}
