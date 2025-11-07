"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Zod schema for login validation
const loginSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber  is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      phoneNumber:'',
      password:'',
    }
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const signInData = await signIn('credentials',{
      phoneNumber: values.phoneNumber,
      password: values.password,
      redirect: false,
    });
    console.log(signInData)
    if(signInData?.error){
      toast.error(signInData.error);
      console.log(signInData.error)
    }
    else{
      router.push('/home')
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back!
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 text-black"
        >
          {/* phoneNumber Number */}
          <div className="relative">
            <input
              type="tel"
              {...register("phoneNumber")}
              className={` w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                errors.phoneNumber
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0  px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
              Phone Number
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              {...register("password")}
              className={`w-full border rounded-md py-3 px-3 peer focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <label className="absolute left-3 top-0 bg-white px-1 text-sm text-gray-600 peer-focus:text-purple-600 peer-focus:-translate-y-2 peer-focus:bg-white transition-all">
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7300ff] text-white py-3 rounded-lg shadow-md hover:bg-[#6000d4] transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#7300ff] hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
