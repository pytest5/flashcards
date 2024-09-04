import React from "react";
import styles from "./CustomButton.module.css";
import { Button } from "react-aria-components";

export default function CustomButton({
  children,
  variant = "primary",
  ...rest
}) {
  let bgColor;
  let color;
  if (variant === "secondary") {
    bgColor = "var(--light-variation)";
    color = "var(--darkest-variation)";
  } else if (variant === "primary") {
    bgColor = "var(--primary-color)";
  } else if (variant === "warning") {
    bgColor = "var(--bright-warning-variation)";
  }
  return (
    <Button
      style={{ backgroundColor: `${bgColor}`, color }}
      className={styles.button}
      {...rest}
    >
      {children}
    </Button>
  );
}
