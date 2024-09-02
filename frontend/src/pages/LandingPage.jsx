import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div>Welcome</div>
      <Link>
        <button>Register</button>
      </Link>
      <button>Sign In</button>
    </>
  );
}
