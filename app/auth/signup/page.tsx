import Header from "@/Components/header";
import SignupForm from "@/Components/signUpForm";

export default function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 flex-col lg:flex-row items-center justify-center p-4">
          <div className="lg:w-1/2 w-full flex justify-center mb-8 lg:mb-0">
            <img
              src="/signup.png"
              alt="Signup Illustration"
              className="max-w-xs lg:max-w-md h-auto"
            />
          </div>
          <div className="lg:w-1/2 w-full max-w-lg rounded-lg shadow-lg bg-white p-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
