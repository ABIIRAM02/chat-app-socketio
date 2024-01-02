"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInBtn = () => {

  const { data: session } = useSession();
//   console.log(session);

  if (session?.user) {
    return (
      <section>
        <p>{session.user.name}</p>
        <button
          onClick={() => {
            signOut();
          }}
        >
          sign out
        </button>
      </section>
    );
  }

  return (
    <section>
      <button onClick={() => signIn()}>sign in</button>
    </section>
  );
};

export default SignInBtn;
