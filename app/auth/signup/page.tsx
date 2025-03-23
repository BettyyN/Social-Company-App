import Header from "@/Components/header";
import SignupForm from "@/Components/signUpForm";

export default function page() {
  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <Header />
        <div className=" flex lg:flex-row flex-col">
          <div className="lg:w-1/3 w-full">
            <img
              src="/signup.png"
              alt="signup"
              className="lg:absolute lg:w-[410px] lg:h-[410px] lg:top-3/5 lg:left-1/6 transform lg:-translate-x-1/3 lg:-translate-y-1/2 z-10"
            />
          </div>
          <div className="lg:w-2/3 w-full bg-secondary shadow-primary shadow-lg rounded-tl-3xl rounded-bl-3xl mb-10 mr-18 opacity-95">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
