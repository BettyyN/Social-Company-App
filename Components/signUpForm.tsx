"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { user, UserFormData } from "../schema/user";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import { useSignupMutation } from "../redux/api/authApi";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "sonner"; 

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(user),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      // baptismalName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signup, { isLoading, error }] = useSignupMutation();

  // In your onSubmit function, update the error handling:
  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Submitting:", data);
      await signup(data).unwrap();
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Signup failed:", err);
      toast.error(`Signup failed: ${err?.data?.message || err?.error || "Unknown error"}`);
    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-black"
        >
          {/** First Name */}
          <div className="relative">
            <input
              type="text"
              {...register("firstName")}
              className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-3 transition-all">
              First Name
            </label>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName?.message}
              </p>
            )}
          </div>

          {/** Last Name */}
          <div className="relative">
            <input
              type="text"
              {...register("lastName")}
              className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-3 transition-all">
              Last Name
            </label>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName?.message}
              </p>
            )}
          </div>

          {/** Email */}
          <div className="relative">
            <input
              type="email"
              {...register("email")}
              className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-3 transition-all">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          {/** Phone Number */}
          <div className="relative">
            <input
              type="tel"
              {...register("phoneNumber")}
              className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                errors.phoneNumber
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-3 transition-all">
              Phone Number
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber?.message}
              </p>
            )}
          </div>

          {/** Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-3 transition-all">
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          {/** Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-3 transition-all">
              Confirm Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-4"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#7300ff] text-white py-3 mx-5 rounded-md shadow-md hover:scale-105 transition-transform mt-6 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin" />
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
