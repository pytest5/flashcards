import React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard/DashBoard";
export default function HomePage() {
  return (
    <>
      <SearchBar />
      <Outlet />
      <Dashboard />
      <NavBar />
    </>
  );
}
