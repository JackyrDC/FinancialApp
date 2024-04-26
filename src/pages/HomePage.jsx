import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthPage } from '../pages'

export const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated ? (
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
        <Sidebar />
        <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
          <Header />
          <Outlet />
        </main>
      </div>
    ) : (
      <div>
        <AuthPage />
        </div>
    )
  );
};