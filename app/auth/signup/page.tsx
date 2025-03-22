import Header from "@/Components/header";
import SignupForm from "@/Components/signUpForm";

export default function page() {
  return (
    <>
      <div className="bg-slate-50">
        <Header />
        <div className="min-h-screen flex lg:flex-row flex-col">
          <div className="lg:w-1/3 w-full">
            <img
              src="/signup.png"
              alt="signup"
              className="lg:absolute lg:w-[510px] lg:h-[510px] lg:top-2/3 lg:left-1/6 transform lg:-translate-x-1/3 lg:-translate-y-1/2"
            />
          </div>
          <div className="lg:w-2/3 w-full bg-white rounded-tl-3xl rounded-bl-3xl">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
