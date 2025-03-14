import Image from "next/image";
import heroBackground from "../public/heroBackground.jpg";

export default function Home() {
  return (
    <main className="bg-[#380F71]">
      <div className="hero min-h-screen relative">
        {/* Apply blur and transparency to the image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Begenra Institute Background"
            layout="fill"
            className="object-cover opacity-80"
            priority
            quality={80}
          />
        </div>

        {/* Apply backdrop blur to the overlay */}
        <div className="hero-overlay backdrop-blur-[3px]"></div>

        <div className="hero-content text-neutral-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-bold">Hello there</h1>
            <p className="mb-10 text-justify">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="bg-[#380F71] text-white rounded-lg w-40 h-12 shadow-md transition-transform duration-300 hover:scale-105 sm:w-32 sm:h-10 md:w-36 md:h-11 lg:w-40 lg:h-12">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
