import { Link } from "react-router-dom";
import { Button } from "react-aria-components";

export default function LandingPage() {
  return (
    <>
      <div>Welcome</div>
      <Link to="/signup">
        <Button>Register</Button>
      </Link>
      <Link to="/login">
        <Button>Log In</Button>
      </Link>
    </>
  );
}
