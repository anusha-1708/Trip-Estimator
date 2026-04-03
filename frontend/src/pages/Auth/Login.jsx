import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { loginUserAsync } from "../../store/auth.store";
import { useEffect } from "react";
import { handleError, handleSuccess } from "../../utils/common";
const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUserAsync(data)).unwrap();
      if (response?.success) {
        handleSuccess(response.message || "Login successful");
      }
    } catch (error) {
      handleError(error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" w-full max-w-xl  bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <h2 className="text-center font-bold text-3xl mb-6">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col"
        >
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              placeholder="Enter your Email..."
              className="flex w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              type="password"
              placeholder="Enter your Password..."
              className="w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mb-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Donot have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
