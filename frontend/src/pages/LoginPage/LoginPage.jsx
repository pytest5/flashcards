import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
// import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);
    const token = await login(formData);
    console.log(token);
    if (token) {
      navigate("/home");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" {...register("email")} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" {...register("password")} />
        </div>
        <div className="form-control">
          <input type="submit" value="Login" />
        </div>
      </form>
    </>
  );
}
