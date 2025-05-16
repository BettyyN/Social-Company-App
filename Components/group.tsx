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
import Link from "next/link";

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
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signup, { isLoading, error }] = useSignupMutation();

  const onSubmit = async (data: UserFormData) => {
    console.log("form", data);
    try {
      const response = await signup({
        ...data,
        role: 2,
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

  const handleFormSubmit = handleSubmit(onSubmit);


  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-5 text-md">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                {...register("firstName")}
                className={`w-full border rounded-md px-1 py-2 peer focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
                placeholder=" "
              />
              <label
                className="absolute left-3 top-1/3 bg-slate-100 px-1 text-xs text-gray-600 transition-all 
        peer-placeholder-shown:top-0 peer-placeholder-shown:text-gray-600
        peer-focus:top-0 peer-focus:text-primary peer-focus:-translate-y-1"
              >
                First Name *
              </label>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName?.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                {...register("lastName")}
                className={`w-full border rounded-md px-1 py-2 peer focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
                placeholder=" "
              />
              <label
                className="absolute left-3 top-1/3 bg-slate-100 px-1 text-xs text-gray-600 transition-all 
        peer-placeholder-shown:top-0 peer-placeholder-shown:text-gray-600
        peer-focus:top-0 peer-focus:text-primary peer-focus:-translate-y-3"
              >
                Last Name *
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName?.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                className={`w-full border rounded-md px-1 py-2 peer focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
                }`}
                placeholder=" "
              />
              <label
                className="absolute left-3 top-1/3 bg-slate-100 px-1 text-xs text-gray-600 transition-all 
        peer-placeholder-shown:top-0 peer-placeholder-shown:text-gray-600
        peer-focus:top-0 peer-focus:text-primary peer-focus:-translate-y-3"
              >
                Email *
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            
            <div className="relative flex items-center justify-center">
              <button
                type="submit"
                className=" bg-[#7300ff] text-white py-2 rounded-md shadow-md hover:scale-105 transition-transform mt-3  w-11/12 "
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
            </div>
          </div>
        </form>
        <h3 className="text-sm font-semibold text-center text-gray-700 my-3">
          Already have an account? {""}
          <Link href="/auth/login" className="hover:underline text-[#7300ff]">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
}
