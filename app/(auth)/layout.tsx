import React, { ReactNode } from "react";
import Image from "next/image";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={
        " flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark px-4 py-10"
      }
    >
      <section
        className={
          "light-border background-light800_dark200 shadow-light100_dark100 min-w-full" +
          " rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8"
        }
      >
        <div className={"flex justify-between items-center gap-2"}>
          <div className="flex items-center gap-2 flex-nowrap">
            <Image
              src="/images/site-logo.svg"
              alt="DevFlow Logo"
              width={23}
              height={23}
            />
            <h1 className="h2-bold font-space-grotesk text-dark100_light900 whitespace-nowrap">
              Dev<span className="text-primary-500">Flow</span>
            </h1>
          </div>
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};
export default RootLayout;
