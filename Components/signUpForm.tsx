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
      baptismalName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signup, { isLoading, error }] = useSignupMutation();

 
  const onSubmit = async (data: UserFormData) => {
    console.log("form",data)
    try {
      const response = await signup({
        ...data,
        role: "STUDENT",
      }).unwrap();
console.log("form", data);
      if (response.success) {
        toast.success("Account created successfully!");
        router.push("/auth/login");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(
        err.data?.message || "Registration failed. Please try again."
      );
    }
  };


  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center  mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/** First Name */}
            <div className="relative">
              <input
                type="text"
                {...register("firstName")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
                placeholder=" "
              />
              <label
                className="absolute left-3 top-1/3 bg-secondary px-1 text-sm text-gray-600 transition-all 
    peer-placeholder-shown:top-0 peer-placeholder-shown:text-gray-600
    peer-focus:top-0 peer-focus:text-primary peer-focus:-translate-y-3"
              >
                First Name *
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
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label className="absolute left-3 top-0 bg-secondary px-1 text-sm text-gray-600 peer-focus:text-primary peer-focus:-translate-y-3 transition-all">
                Last Name *
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName?.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                {...register("baptismalName")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.baptismalName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label className="absolute left-3 top-0 bg-secondary px-1 text-sm text-gray-600 peer-focus:text-primary peer-focus:-translate-y-3 transition-all">
                Baptismal Name *
              </label>
              {errors.baptismalName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.baptismalName?.message}
                </p>
              )}
            </div>

            {/** Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="doe@gmail.com"
                {...register("email")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label className="absolute left-3 top-0 bg-secondary px-1 text-sm text-gray-600 peer-focus:text-primary peer-focus:-translate-y-3 transition-all">
                Email *
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
                placeholder="+251"
                type="tel"
                {...register("phoneNumber")}
                className={`w-full border rounded-md px-3 pt-5 pb-2 peer focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label className="absolute left-3 top-0 bg-secondary px-1 text-sm text-gray-600 peer-focus:text-primary peer-focus:-translate-y-3 transition-all">
                Phone Number *
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
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label className="absolute left-3 top-0 bg-secondary px-1 text-sm text-gray-600 peer-focus:text-primary peer-focus:-translate-y-3 transition-all">
                Password *
              </label>
              <button
                type="button"
                className="absolute right-3 top-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              <label className="absolute left-3 top-0 bg-secondary px-1 text-sm text-gray-600 peer-focus:text-primary peer-focus:-translate-y-3 transition-all">
                Confirm Password *
              </label>
              <button
                type="button"
                className="absolute right-3 top-4"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#7300ff] text-white py-3 mx-8 rounded-md shadow-md hover:scale-105 transition-transform mt-6 flex items-center justify-center gap-2 "
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
