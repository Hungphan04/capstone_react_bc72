import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
}
