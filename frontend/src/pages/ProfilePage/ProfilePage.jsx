import React from "react";
import { Button } from "react-aria-components";
import styles from "./ProfilePage.module.css";

export default function ProfilePage({ user }) {
  return (
    <>
      <div className={styles.profileImage}>{user.userName[0]}</div>
      <h4>{user.userName}</h4>
      <h4>{user.email}</h4>
      <Button>Logout</Button>
      <Button>Delete Account</Button>
    </>
  );
}
