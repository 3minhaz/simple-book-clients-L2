import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks/useReduxHooks";
import { loginUser } from "../../redux/users/user";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useAppDispatch();
  const handleLogin: SubmitHandler<Inputs> = (data) => {
    dispatch(loginUser(data));
    navigate(from, { replace: true });
    reset();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-[600px] ">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">login</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="grid gap-6 grid-cols-1"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              {...register("email", { required: "Email Address is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character or above",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-3">{errors.password?.message}</p>
            )}
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
          </div>

          <input
            className="btn bg-[#3A4256] text-white"
            value="Login"
            type="submit"
          />
        </form>
        <p className="mt-4">
          New to Book Center?{" "}
          <Link to="/signup" className="text-secondary">
            Create new account
          </Link>
        </p>
        {/* <div className="divider">OR</div> */}
        {/* <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button> */}
      </div>
    </div>
  );
};

export default Login;
