import Header from "@/Components/header";
import LoginForm from "@/Components/loginForm";

export default function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen ">
        <Header />
        <div className="flex lg:flex-row flex-col  items-center mt-20">
          <div className="lg:w-1/3 w-full">
            <img
              src="/login.png"
              alt="signup"
              className="lg:absolute lg:w-[500px] lg:h-[500px] lg:top-1/2 lg:left-1/6 transform lg:-translate-x-1/3 lg:-translate-y-1/2"
            />
          </div>
          <div className="lg:w-1/3 w-full rounded-tr-3xl rounded-br-3xl shadow-[#7300ff] shadow-sm bg-white]">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
