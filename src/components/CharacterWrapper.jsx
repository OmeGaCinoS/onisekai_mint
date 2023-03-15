import React, { useRef } from "react"
import { Parallax, ParallaxProvider } from "react-scroll-parallax"
import img1 from "../assets/images/GWECKO.png"
import img2 from "../assets/images/ISAMU.png"

const CharacterWrapper = () => {
  const root = useRef()
  return (
    <ParallaxProvider>
      <div
        className="relative flex flex-col items-center justify-center pb-10 xl:block xl:h-[900px] xl:pb-0"
        ref={root}
      >
        {/* clip-path */}
        <div className="absolute inset-0 -z-10 bg-accent-light-red [clip-path:polygon(0_38%,_100%_0%,_100%_100%,_0%_100%)]" />
        {/* background */}
        <div className="absolute bottom-0 left-0 right-0 top-[25%] z-10 bg-gradient-to-b from-transparent via-accent-light-red to-accent-light-red xl:hidden" />
        <Parallax speed={10}>
          {/* blue: absolute */}
          <img
            src={img1}
            alt="character"
            className="absolute -left-16 z-10 w-[300px] object-contain sm:-left-32 sm:w-[400px] xl:left-0 xl:top-48 xl:w-[600px]"
          />
          {/* red */}
          <img
            src={img2}
            alt="character"
            className="relative -right-9 w-[300px] object-contain sm:-right-20 sm:w-[400px] lg:left-[15%] xl:absolute xl:top-36 xl:w-[600px]"
          />
        </Parallax>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-end ">
          <div className="relative z-20 mt-7 text-center xl:w-[650px] xl:text-left">
            <p className="font-medium tracking-[5px] sm:text-2xl">
              WALK AROUND KAMADO <br className="sm:hidden" /> AND GET TO
            </p>
            <h3 className="font-bebas-neue text-7xl font-bold leading-[60px] tracking-[3px] sm:text-[100px] sm:leading-[90px]">
              KNOW YOUR
              <br />
              CHARACTERS
            </h3>
            <p className="hidden max-w-md font-[myriadpro-regular] text-lg tracking-[1.5px] text-white/80 xl:block">
              WHILE WALKING AROUND THE TECHNOLOGICAL YET “MAGICAL” STREETS OF
              KAMADO, YOU’RE GUARANTEED TO MEET AT LEAST ONE OF THESE FELLAS!
            </p>
            <div className="my-3 flex justify-center gap-5 sm:my-6 xl:justify-start">
              <button className="hidden rounded-lg bg-[#444444] px-12 py-2 text-xl font-semibold text-[#a5a5a5] transition-all hover:bg-[#191919] hover:text-white xl:block">
                Characters
              </button>
              <button className="hidden rounded-lg bg-[#444444] px-12 py-2 text-xl font-semibold text-[#a5a5a5] transition-all hover:bg-[#191919] hover:text-white xl:block">
                KAMADO
              </button>
              <button className="hidden rounded-lg bg-[#444444] px-12 py-2 text-xl font-semibold text-[#a5a5a5] transition-all hover:bg-[#191919] hover:text-white xl:block">
                ONIVERSE
              </button>
              {/* mobile btn */}
              <button className="mt-4 rounded-lg bg-[#191919] px-12 py-2 text-3xl font-semibold text-white transition-all xl:hidden">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  )
}

export default CharacterWrapper
