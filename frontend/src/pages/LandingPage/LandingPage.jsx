import { Link } from "react-router-dom";
import { Button } from "react-aria-components";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <h1 className={styles.welcomeHeader}>Welcome to FlashLearn!</h1>
      <div className={styles.welcomeMsg}>
        Are you ready to make learning easy and enjoyable? Whether you’re
        studying for an exam, expanding your vocabulary, or picking up a new
        hobby, our app provides the tools you need to succeed!
      </div>
      <div className={styles.landingActions}>
        <Link to="/signup">
          <Button className={styles["react-aria-Button"]}>Register</Button>
        </Link>
        <Link to="/login">
          <Button
            className={`${styles["react-aria-Button"]} ${styles.secondary}`}
          >
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
}
