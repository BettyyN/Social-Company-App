import Header from "@/Components/header";
import SignupForm from "@/Components/signUpForm";

export default function page() {
  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <Header />
        <div className=" flex lg:flex-row flex-col">
          <div className="lg:w-2/5 w-full flex justify-center items-center">
            <img
              src="/signup.png"
              alt="signup"
              className=" lg:w-[410px] lg:h-[410px] lg:top-3/5  z-10"
            />
          </div>
          <div className="lg:w-2/5 w-full  shadow-[#e1d6fe] shadow-lg rounded-tl-3xl rounded-bl-3xl px-5">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
