import { useForm } from "react-hook-form"
import { DatePicker } from "react-aria-components";

export default function SignUpPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

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
          <input type="password" name="conFirmPassword" {...register("confirmPassword", {
            required: true
          })} />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
