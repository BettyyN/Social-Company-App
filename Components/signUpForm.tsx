"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { user, UserFormData } from "../schema/user";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useSignupMutation } from "../redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(user),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data: UserFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("roleId", "1");

      const response = await signup(formData).unwrap();

      if (response.success) {
        toast.success("Account created successfully!");
        router.push("/auth/login");
      }
    } catch (err: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (err.data?.details) errorMessage = err.data.details;
      else if (err.data?.message) errorMessage = err.data.message;
      else if (err.status === 400) errorMessage = "Invalid input.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 text-md">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                {...register("firstName")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label
                className="absolute left-3 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
                "
              >
                First Name *
              </label>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                {...register("lastName")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label
                className="absolute left-3 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
                "
              >
                Last Name *
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                {...register("email")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label
                className="absolute left-3 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
                "
              >
                Email *
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <input
                type="tel"
                placeholder=" "
                {...register("phoneNumber")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label
                className="absolute left-3 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
                "
              >
                Phone Number *
              </label>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Passwords */}
            <div className="flex md:flex-row flex-col gap-4">
              {/* Password */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  {...register("password")}
                  className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />
                <label
                  className="absolute left-3 text-sm text-gray-600 transition-all 
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 
                  peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
                  "
                >
                  Password *
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder=" "
                  {...register("confirmPassword")}
                  className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />
                <label
                  className="absolute left-3 text-sm text-gray-600 transition-all 
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 
                  peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
                  "
                >
                  Confirm Password *
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#7300ff] text-white py-2 rounded-md shadow-md hover:scale-105 transition-transform mt-3 w-11/12 items-center"
              >
                {isLoading ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </div>
        </form>

        <h3 className="text-sm font-semibold text-center text-gray-700 my-3">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:underline text-[#7300ff]">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
}
