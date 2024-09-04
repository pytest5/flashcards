import React from "react";
import styles from "./FormContainer.module.css";
import FormNavBar from "../FormNavBar/FormNavBar";
export default function FormContainer({ header, children, to, ...props }) {
  return (
    <div className={styles.formContainer} {...props}>
      <FormNavBar to={to} />
      <h1 className={styles.formHeader}>{header}</h1>
      {children}
    </div>
  );
}
