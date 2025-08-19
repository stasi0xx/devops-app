"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

import ROUTES from "@/constants/routes";
import { signIn } from "next-auth/react";

const SocialAuthForm = () => {
  const buttonClass =
    "background-light700_dark400 flex-1 text-dark200_light800 rounded-2 min-h-12 px-4 py-3";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);
      toast.error("Sign in failed.", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        position: "top-center",
      });
    }
  };

  return (
    <div className={"mt-10 flex flex-wrap gap-2.5 "}>
      <Button
        variant={"secondary"}
        className={buttonClass}
        onClick={() => handleSignIn("github")}
      >
        <Image
          src={"icons/github.svg"}
          alt={"Github"}
          width={20}
          height={20}
          className={"invert-colors mr-2.5 object-contain"}
        />
        <span>Log in with Github</span>
      </Button>
      <Button
        variant={"secondary"}
        className={buttonClass}
        onClick={() => handleSignIn("google")}
      >
        <Image
          src={"icons/google.svg"}
          alt={"Google"}
          width={20}
          height={20}
          className={"mr-2.5 object-contain"}
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};
export default SocialAuthForm;
