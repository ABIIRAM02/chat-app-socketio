"use client";
import Lottie from "lottie-react";
import Animi from "../assets/Animation.json";

import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./GlobalRedux/Features/counter/CounterSlice";
import Nav from "@/Components/Nav";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter()

  const handleOnsignIn = () => {
    signIn()
  }

  useEffect(()=>{
    if(session) 
    router.push('/globel-chat')
  } , [session])

  return (
    <section className="h-screen w-full overflow-hidden flex flex-col justify-center items-center relative bg-radial-gradient ">

        <svg
          className=" absolute -top-28 left-1/2 transform -translate-x-1/2  w-8/12"
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

          <g className="textcircle " >
            <text>
              <textPath
                xlinkHref="#textcircle"
                textLength="340"
                className="text-4xl font-big"
                style={{fill:'#313131'}}
              >
                Globel - Chat
              </textPath>
            </text>
          </g>
        </svg>
          <Lottie
            className="h-3/4 "
            loop={false}
            autoPlay={true}
            animationData={Animi}
          />
          <p className="font-most text-myBrown relative mb-2" >Hay haii , welcome to Globel Chat ! , just login with your Gmail id to get started.!</p>
          <h2 onClick={handleOnsignIn} className="font-few text-2xl myUnderline relative cursor-pointer" >Click to Login</h2>

    </section>

    // <section className="app" >
    //         <Nav />
    //  <p>
    //   <button onClick={()=>{dispatch(increment())}} >Increment</button>
    //   </p>
    //   <p>
    //   <button onClick={()=>{dispatch(decrement())}} >Decrement</button>
    //   </p>
    //   <p>
    //   <span>{count}</span>
    //   </p>
    //   <p>
    //   <button onClick={()=>{dispatch(incrementByAmount(2))}} >Increment by amt</button>
    //   </p>
    //   hay abii
    // </section>
  );
};

export default Home;
