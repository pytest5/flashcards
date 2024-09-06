import { Link } from "react-router-dom";
import { Button } from "react-aria-components";
import styles from "./LandingPage.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import LandingPageIcon from "../../components/LandingPageIcon/LandingPageIcon";

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <LandingPageIcon />
      <h1 className={styles.welcomeHeader}>Welcome to FlashLearn!</h1>
      <div className={styles.welcomeMsg}>
        Whether you’re studying for an exam, expanding your vocabulary, or
        picking up a new hobby, our app provides the tools you need to succeed!
      </div>
      <div className={styles.landingActions}>
        <Link to="/signup">
          <CustomButton>Register</CustomButton>
        </Link>
        <Link to="/login">
          <CustomButton variant="secondary">Log In</CustomButton>
        </Link>
      </div>
    </div>
  );
}
