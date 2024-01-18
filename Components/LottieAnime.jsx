'use client'
import Lottie from "lottie-react";
import Animi from "../assets/Animation.json";

const LottieAnime = () => {
  return (
    <Lottie
    className="lg:h-[75%] md:h-[50%]"
    loop={false}
    autoPlay={true}
    animationData={Animi}
  />
  )
}

export default LottieAnime