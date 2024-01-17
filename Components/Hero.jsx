"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();

  const handleOnsignIn = async () => {
    await signIn("google", {
      redirect: "/globel-chat",
      callbackUrl: "/globel-chat",
    });
  };

  return !session ? (
    <main className="absolute bottom-10 flex flex-col items-center">
      <p className=" md:p-0 p-2 text-center font-most text-myBrown mb-2">
        Hay haii , welcome to Globel Chat ! , just login with your Gmail id to
        get started.!
      </p>
      <h2
        onClick={handleOnsignIn}
        className="font-few text-2xl myUnderline relative cursor-pointer"
      >
        Click to Login
      </h2>
    </main>
  ) : (
    <h2
      onClick={() => signOut()}
      className="font-few text-2xl myUnderline relative cursor-pointer"
    >
      Wanna Log-out {session?.user?.name.split(" ")[0]} .?
    </h2>
  );
};

export default Hero;
