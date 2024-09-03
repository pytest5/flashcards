import { useForm } from "react-hook-form";
import { createUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.module.css";

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Username</label>
          <input type="text" name="userName" {...register("userName")} />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" {...register("email")} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" {...register("password")} />
        </div>
        <div className="form-control">
          <label>Confirm Password</label>
          <input
            type="password"
            name="conFirmPassword"
            {...register("confirmPassword", {
              required: true,
            })}
          />
        </div>
        <div className="form-control">
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
        <div className="form-control">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </>
  );
}
