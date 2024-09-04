import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import styles from "./LoginPage.module.css";
import FormContainer from "../../components/FormContainer/FormContainer";

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
    <FormContainer header="Welcome Back!" to={"/"}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label>Email:</label>
          <input type="text" name="email" {...register("email")} />
        </div>
        <div className={styles.formControl}>
          <label>Password:</label>
          <input type="password" name="password" {...register("password")} />
        </div>
        <input
          className={styles.formSubmitButton}
          type="submit"
          value="Login"
        />
      </form>
    </FormContainer>
  );
}
