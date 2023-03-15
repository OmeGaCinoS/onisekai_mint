import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import left from "../assets/images/drawingLeft.png"
import right from "../assets/images/drawingRight.png"
import leftMobile from "../assets/images/drawingLeftMobile.png"
import rightMobile from "../assets/images/drawingRightMobile.png"
import crystal from "../assets/images/crystal.png"
import crystal_red from "../assets/images/crystal_red.png"
import useWidth from "../hooks/useWidth"

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useWidth()

  useEffect(() => {
    if (width < 1024) setIsMobile(true)
    else setIsMobile(false)
  }, [width])

  return (
    <div className="[media] relative mx-auto mt-40 flex items-start justify-center sm:min-h-[600px] md:min-h-[690px] lg:mt-10 lg:items-stretch">
      <motion.img
        initial={{ translateX: "-100%", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        src={isMobile ? leftMobile : left}
        alt="drawing"
        className="absolute left-0 max-h-[900px] object-contain object-top sm:min-h-[900px] xl:left-28 xl:max-h-[1100px]"
      />
      <div className="relative z-20 flex flex-col-reverse lg:flex-col">
        <div className="mt-14 flex items-center justify-center md:mt-20">
          <img
            src={crystal}
            alt="crystal"
            className="crystal_animation relative left-14 w-60 lg:left-20 lg:w-96"
          />
          <img
            src={crystal_red}
            alt="crystal"
            className="crystal_animation1 relative right-14 w-60 lg:right-20 lg:w-96"
          />
        </div>
        <div className="mx-auto md:mt-8 lg:mt-6">
          <p className="text-center font-bebas-neue text-5xl italic lg:text-7xl">
            <span className="text-accent-red">PICK</span>{" "}
            <span className="text-4xl text-white lg:text-6xl">A</span>{" "}
            <span className="text-ferozi">SIDE</span>
          </p>
          <p className="mt-5 max-w-[290px] text-center font-bebas-neue italic tracking-[1.5px] lg:max-w-[410px]">
            The <span className="font-bold">oniverse</span> is undergoing a huge
            transformation. It’s time for you as a hero to pick a side in this
            grand battle. are you ready for the challenges up ahead? Choose
            wisely.
          </p>
        </div>
      </div>
      <motion.img
        initial={{ translateX: "100%", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        src={isMobile ? rightMobile : right}
        alt="drawing"
        className="absolute right-0 max-h-[900px] object-contain object-top sm:min-h-[900px] xl:right-28 xl:max-h-[1100px]"
      />
    </div>
  )
}

export default Hero
