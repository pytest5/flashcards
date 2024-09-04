import React from "react";
import { Button } from "react-aria-components";
import styles from "./ProfilePage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { getCurrentUser } from "../../services/userService";

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
    <div className={styles.profileFlex}>
      <div className={styles.profileImage}>{user.userName[0]}</div>
      <h2>{user.userName}</h2>
      <h3>{user.email}</h3>
      <Button className={styles.myButton}>Logout</Button>
      <Button>Delete Account</Button>
      <NavBar className={styles.navPosition} />
    </div>
  );
}
