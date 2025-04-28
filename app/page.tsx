import Image from "next/image";
import heroBackground from "../public/nnn.jpg";
import Header from "../Components/header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden relative bg-[#F5F7FA]">
      {/* Background image
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBackground}
          alt="Begenra Institute Background"
          fill
          className="object-cover"
          priority
        />
      </div> */}

      {/* Overlay + Header */}
      <div className="absolute inset-0 z-10 ">
        <Header />
      </div>

      {/* Hero content */}
      <div className="relative  h-full flex text-neutral-content w-full items-center gap-6">
        <div className="w-2/3 p-28">
          <h1 className="mb-5 md:text-5xl text-2xl font-bold text-[#7300ff]">
            Selam,
          </h1>
          <h2 className="mb-5 md:text-5xl font-bold">
            Kidus Yared Yebegena Maseltegna
          </h2>
          <p className="mb-5 text-justify">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup">
              <button className="bg-[#7300ff] text-white rounded-lg w-40 h-12 shadow-md transition-transform duration-300 hover:scale-105">
                Register
              </button>
            </Link>
            <Link href="/home">
              <button className="bg-[#7300ff] text-white rounded-lg w-40 h-12 shadow-md transition-transform duration-300 hover:scale-105">
                Home
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/3 relative">
          <Image
            src={heroBackground}
            alt="Begenra Institute Background"
            className="h-72 w-52"
          />
        </div>
      </div>
    </main>
  );
}
