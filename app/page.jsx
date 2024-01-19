import Hero from "@Components/Hero";
import LottieAnime from "@Components/LottieAnime";

const Home = () => {
  return (
    <section className="h-screen w-full overflow-hidden flex flex-col justify-center items-center relative bg-radial-gradient ">
    <svg
      className=" absolute lg:-top-28 left-1/2 transform -translate-x-1/2 lg:w-8/12 md:w-full w-[120vw] top-0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlLang="en"
      viewBox="0 0 500 500"
    >
      <defs>
        <path
          id="textcircle"
          d="M250,400a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
          transform="rotate(114, 250, 250)"
        />
      </defs>

      <g className="textcircle ">
        <text>
          <textPath
            xlinkHref="#textcircle"
            textLength="340"
            className="text-4xl font-big"
            style={{ fill: "#313131" }}
          >
            Globel - Chat
          </textPath>
        </text>
      </g>
    </svg>

      <LottieAnime />
      <Hero />
      </section>
  );
};

export default Home;
