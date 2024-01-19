'use client'
import Lottie from "lottie-react";
import Animi from "../assets/Animation.json";

const LottieAnime = () => {
  return (
    <Lottie
    className="lg:h-[35rem] md:h-[25rem]"
    loop={false}
    autoPlay={true}
    animationData={Animi}
  />
  )
}

export default LottieAnime