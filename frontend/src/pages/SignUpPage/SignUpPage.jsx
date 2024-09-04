import { useForm } from "react-hook-form";
import { createUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import FormContainer from "../../components/FormContainer/FormContainer";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const result = await createUser(formData);
    console.log(result);
    if (result) {
      navigate("/login");
    }
  };

  return (
    <FormContainer header="Create Account" to={"/"}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label>Username</label>
          <input type="text" name="userName" {...register("userName")} />
        </div>
        <div className={styles.formControl}>
          <label>Email</label>
          <input type="text" name="email" {...register("email")} />
        </div>
        <div className={styles.formControl}>
          <label>Password</label>
          <input type="password" name="password" {...register("password")} />
        </div>
        <div className={styles.formControl}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="conFirmPassword"
            {...register("confirmPassword", {
              required: true,
            })}
          />
        </div>
        <div className={styles.formControl}>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of Birth is required",
              },
            })}
          />
        </div>
        <input
          className={styles.formSubmitButton}
          type="submit"
          value="Sign Up"
        />
      </form>
    </FormContainer>
  );
}
