import React from "react";
import { useRoutes } from "react-router-dom";
import { PATH } from "./path";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import LoginPage from "./../modules/auth/Login/LoginPage";
import RegisterPage from "./../modules/auth/register/RegisterPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "./../modules/home/HomePage/HomePage";
import AdminLayout from './../layouts/AdminLayout/AdminLayout';
import UserManagement from './../modules/admin/UserManagement/UserManagement';
import MovieManagementPage from "../modules/admin/MovieManagement/MovieManagement";
import MovieDetail from "../modules/home/MovieDetail/MovieDetail"; // Thêm MovieDetail vào đây

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
      path: PATH.ADMIN,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <div>Admin Overview</div>,
        },
        {
          path: PATH.USER_MANAGEMENT,
          element: <UserManagement />,
        },
        {
          path: PATH.MOVIE_MANAGEMENT,
          element: <MovieManagementPage />,
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
