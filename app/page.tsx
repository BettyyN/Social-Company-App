import Image from "next/image";
import heroBackground from "../public/nn.jpg";
import Header from "../Components/header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBackground}
          alt="Begenra Institute Background"
          fill
          className="object-cover brightness-90"
          priority
          quality={80}
        />
      </div>

      {/* Overlay + Header */}
      <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-[2px]">
        <Header />
      </div>

      {/* Hero content */}
      <div className="relative z-20 h-full flex items-center justify-center text-neutral-content text-center px-4">
        <div className="max-w-md md:max-w-xl">
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
      </div>
    </main>
  );
}
