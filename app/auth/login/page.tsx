import Header from "@/Components/header";
import LoginForm from "@/Components/loginForm";

export default function page() {
  return (
    <>
      <div className="bg-gradient-to-bl from-[#6000DA] to-[#A270FF] ">
        <Header />
        <div className="min-h-screen flex lg:flex-row flex-col">
          <div className="lg:w-1/3 w-full">
            <img
              src="/login.png"
              alt="signup"
              className="lg:absolute lg:w-[700px] lg:h-[700px] lg:top-1/2 lg:left-1/6 transform lg:-translate-x-1/3 lg:-translate-y-1/2"
            />
          </div>
          <div className="lg:w-2/3 w-full bg-white rounded-tl-3xl rounded-bl-3xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
