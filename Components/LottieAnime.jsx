'use client'
import Lottie from "lottie-react";
import Animi from "../assets/Animation.json";

const LottieAnime = () => {
  return (
    <Lottie
    className="lg:h-3/4 md:h-2/4"
    loop={false}
    autoPlay={true}
    animationData={Animi}
  />
  )
}

export default LottieAnime