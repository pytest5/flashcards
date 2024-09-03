import React from "react";
import { Button } from "react-aria-components";

export default function ProfilePage({ user }) {
  return (
    <>
      <div id="profileImage">a</div>
      <h4>{user.userName}</h4>
      <h4>{user.email}</h4>
      <Button>Logout</Button>
      <Button>Delete Account</Button>
    </>
  );
}
