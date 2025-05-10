"use client";
import Image from "next/image";
import heroBackground from "../public/nature.jpg";
import rose from "../public/r1.jpg";
import Header from "../Components/header";
import { useRouter } from "next/navigation";
import ContactUs from "@/Components/contactUs";

export default function Home() {
  const router = useRouter();
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(path);
  };
  return (
    <main className="h-screen w-full overflow-hidden relative bg-[#F5F7FA]">
      <div className="absolute inset-0 z-10 ">
        <Header />
      </div>

      <div className="relative  h-full flex text-neutral-content w-full items-center gap-6 flex-col md:flex-row justify-center ">
        <div className="md:w-2/5 p-5  w-full">
          <h1 className="mb-5 md:text-3xl text-2xl font-bold text-[#7300ff]">
            Selam,
          </h1>
          <h2 className="mb-5 md:text-2xl font-bold">
          Ethiopia
          </h2>
          <p className="mb-5 text-justify">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex flex-wrap  gap-4">
            <button
              onClick={handleNavigation("/auth/signup")}
              className="border border-[#7300ff] text-[#7300ff] font-medium rounded-lg w-32 h-10 shadow-md transition-transform duration-300 hover:scale-105 bg-[#e1d6fe]  cursor-pointer"
            >
              Register
            </button>
            <button
              onClick={handleNavigation("/home")}
              className="bg-[#7300ff] text-white rounded-lg w-32 h-10 shadow-md transition-transform duration-300 hover:scale-105  cursor-pointer"
            >
              Home
            </button>
          </div>
        </div>
        <div className="lg:w-1/3 w-full relative p-5 md:p-2 items-center flex justify-center">
          <Image
            src={rose}
            alt="Begenra Institute Background"
            className="h-72 w-44 translate-4 rounded-lg"
          />
          <Image
            src={heroBackground}
            alt="Begenra Institute Background"
            className="h-72 w-44 rounded-lg"
          />
        </div>
      </div>
      <ContactUs/>
    </main>
  );
}
