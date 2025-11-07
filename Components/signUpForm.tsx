"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { user, UserFormData } from "../schema/user";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import api from "../lib/api/axiosInstance"; // Import the axios instance

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
  const [isLoading, setIsLoading] = useState(false); // Manage loading state locally

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("roleId", "1"); // Assuming default roleId is 1

      const response = await api.post("/api/user", formData); // Direct Axios POST request

      if (response.data.success) {
        toast.success("Account created successfully!");
        router.push("/auth/login");
      }
    } catch (err: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (err.response?.data?.details) errorMessage = err.response.data.details;
      else if (err.response?.data?.message) errorMessage = err.response.data.message;
      else if (err.response?.status === 400) errorMessage = "Invalid input.";
      else if (err.message) errorMessage = err.message;

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 text-md">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                {...register("firstName")}
                className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-500"
                }`}
              />
              <label className="absolute left-3 top-0 px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
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
                {...register("lastName")}
                className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-500"
                }`}
              />
              <label className="absolute left-3 top-0 px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
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
                {...register("email")}
                className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-500"
                }`}
              />
              <label className="absolute left-3 top-0 px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
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
                {...register("phoneNumber")}
                className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-500"
                }`}
              />
              <label className="absolute left-3 top-0 px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
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
                  {...register("password")}
                  className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                <label className="absolute left-3 top-0 px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
                  Password *
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-3"
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
                  {...register("confirmPassword")}
                  className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                <label className="absolute left-3 top-0 px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
                  Confirm Password *
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-3"
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
                className="w-full bg-[#7300ff] text-white py-3 rounded-lg shadow-md hover:bg-[#6000d4] transition-colors duration-300"
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

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#7300ff] hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
