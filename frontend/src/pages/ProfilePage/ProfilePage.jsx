import React from "react";
import { Button } from "react-aria-components";
import styles from "./ProfilePage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { getCurrentUser } from "../../services/userService";
import CustomButton from "../../components/CustomButton/CustomButton";

export default function ProfilePage() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      setUser(user);
    }
    loadUser();
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.profilePageWrapper}>
      {/* <h1 className={styles.profileGreetings}>Halo {user.userName}!</h1> */}
      <div className={styles.profileImage}>{user.userName[0]}</div>
      <div className={styles.profilePageUserInfo}>
        <div>{user.email}</div>
      </div>

      <div className={styles.profilePageActions}>
        <CustomButton>Logout</CustomButton>
        <CustomButton variant="secondary">Delete</CustomButton>
      </div>
    </div>
  );
}
