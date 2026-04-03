import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { registerUserAsync } from "../../store/auth.store";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/common";

const Signup = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      profileImage: null,
    },
  });
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const fields = ["fullName", "email", "password", "profileImage"];
      const isValid = await trigger(fields);
      if (isValid) {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("profileImage", data.profileImage[0]);
        const response = await dispatch(registerUserAsync(formData)).unwrap();
        handleSuccess(response.message || "Signup successfull");
        setTimeout(() => {
          navigate("/login");
          reset();
        }, 2000);
      }
    } catch (error) {
      handleError(error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-row md:flex w-full max-w-2xl bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="w-full md:w-full p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-full flex gap-2">
              {/* <button className="px-6 py-2 rounded-full text-sm font-medium transition-all">
                Login
              </button> */}
              <div className="text-xl font-medium">Signup</div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">
                Upload Profile Picture
              </label>
              <input
                type="file"
                {...register("profileImage", {
                  required: "Profile picture is required",
                })}
                accept="image/png, image/jpeg"
                className="border border-gray-200"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setPreview(URL.createObjectURL(selectedFile));
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <input
                {...register("fullName", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z'\-\s]{2,50}$/,
                    message: "FullName should be character not numeric",
                  },
                })}
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
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
                placeholder="Password"
                required
                className="w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Min 6 characters required
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
