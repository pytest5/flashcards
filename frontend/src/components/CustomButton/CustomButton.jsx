import React from "react";
import styles from "./CustomButton.module.css";
import { Button } from "react-aria-components";

export default function CustomButton({
  children,
  variant = "primary",
  ...rest
}) {
  return (
    <Button
      // style={{ backgroundColor: `${bgColor}`, color }}
      className={`${styles.button} ${styles[variant]}`}
      {...rest}
    >
      {children}
    </Button>
  );
}
