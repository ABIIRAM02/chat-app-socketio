// import Hero from "@Components/Hero";

const Home = () => {

  return (
    <section className="h-screen w-full overflow-hidden flex flex-col justify-center items-center relative bg-radial-gradient ">
    <svg
      className=" absolute lg:-top-28 left-1/2 transform -translate-x-1/2 2xl:w-5/12 xl:w-8/12 md:w-full w-[150vw] md:top-0 top-10"
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

      {/* <LottieAnime /> */}
  
    {/* {!session ? ( */}
    <main className="absolute bottom-10 flex flex-col items-center" >
        <p className=" md:p-0 p-2 text-center font-most text-myBrown mb-2">
          Hay haii , welcome to Globel Chat ! , just login with your Gmail id
          to get started.!
        </p>
        <h2
          className="font-few text-2xl myUnderline relative cursor-pointer"
        >
          Click to Login
        </h2>
    </main>
    {/* ) :  <h2
    onClick={() => signOut()}
    className="font-few text-2xl myUnderline relative cursor-pointer"
  >
    Wanna Log-out {session?.user?.name.split(' ')[0]} .?
  </h2>} */}
  </section>
  );
};

export default Home;
