import React from "react";
import { Outlet } from "react-router-dom";
import FormNavBar from "../FormNavBar/FormNavBar";
import styles from "./EntryLayout.module.css";

export default function EntryLayout() {
  return (
    <div>
      <FormNavBar></FormNavBar>
      <Outlet />
    </div>
  );
}
