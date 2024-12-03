import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { PATH } from "./../../routes/path";
import { useSelector } from "react-redux";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className=" rounded-2xl p-8">
        <div className="w-full flex items-center justify-center mb-6">
        </div>
        {children}
        <Outlet />
      </div>
    </div>
  );
}
