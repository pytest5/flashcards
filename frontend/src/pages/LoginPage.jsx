import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    // if (!formData.email || !formData.password){

    // }
  }

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
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
