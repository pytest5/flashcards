import React from "react";
import styles from "./FormContainer.module.css";
import FormNavBar from "../FormNavBar/FormNavBar";
export default function FormContainer({ header, children, to, ...props }) {
  return (
    <div className={styles.formContainer} {...props}>
      <FormNavBar to={to} style={{ position: "sticky", top: 0, zIndex: 1 }} />
      <h1
        className={styles.formHeader}
        style={{ position: "sticky", top: 0, background: "white" }}
      >
        {header}
      </h1>
      {children}
    </div>
  );
}
