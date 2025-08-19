import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const SignIn = ({ name }: { name: string }) => {
  const authenticationProvider = name.toLowerCase();

  const buttonClass =
    "background-light700_dark400 flex-1 text-dark200_light800 rounded-2 min-h-12 px-4 py-3";
  return (
    <form
      action={async () => {
        "use server";
        await signIn(authenticationProvider);
      }}
    >
      <Button variant={"secondary"} className={buttonClass}>
        <Image
          src={`icons/${authenticationProvider}.svg`}
          alt={"Github"}
          width={20}
          height={20}
          className={"invert-colors mr-2.5 object-contain"}
        />
        <span>Log in with {authenticationProvider.toUpperCase()}</span>
      </Button>
    </form>
  );
};

export default SignIn;
