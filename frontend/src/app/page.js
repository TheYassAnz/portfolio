import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <>
    <h1 className="sr-only">Portfolio de Yassine ANZAR BASHA</h1>
    <WavyBackground className="w-full h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Site en maintenance
      </h2>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Je vous invite à me contacter sur LinkedIn.
      </p>
      <div className="mt-5 flex justify-center text-center">
        <a
          href="https://www.linkedin.com/in/yanzarbasha/"
          target="_blank"
          className="text-2xl md:text-3xl mt-4 text-white font-normal inter-var text-center"
        >
          <span className="bi bi-linkedin"></span>
        </a>
      </div>
    </WavyBackground>
    </>
  );
}
